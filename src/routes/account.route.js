
import express from "express";
import HttpError from "http-errors";
import accountRepository from "../repositories/account.repository.js";
import { authorizationJWT } from "../middlewares/authorization.jwt.js";

const router = express.Router();

class accountRoutes {

    constructor() {

        router.post('/', this.post);
        router.post('/actions/login', authorizationJWT, this.login)
        router.get('/:idAccount', this.getOne)




    }
    async getOne(req, res, next) {
        try {
            const { email } = req.auth


            const idAccount = req.params.idAccountlet;
            let account = await accountRepository.getOne(idAccount)
            if (!account) {
                return next(HttpError.NotFound('Account not found'))
            }

            const isMe = account.email === email
            if (!isMe && !account.isPublic) {
                return next(HttpError.Forbidden('Account not found'))
            }

            account = account.toObject({ getters: false, virtuals: false })
            account = accountRepository.transform(account)

            res.status(200).json(account);

        } catch (err) {
            return next(err)
        }
    }

    async login(req, res, next) {
        const { email, username, password } = req.body
        if ((email && username) || email === "" || username == "") {
            return next(HttpError.BadRequest('Provide either email or username'))
        }
        const result = await accountRepository.login(email, username, password)

        if (result.account) {
            let account = result.account.toObject({ getters: false, virtuals: false })
            account = accountRepository.transform(account);
            //generate jwt tokens
            const tokens = accountRepository.generateJWT(account.email)
            res.status(201).json({ account, tokens })
        }
        else {

            return next(result.err)
        }
    }

    async post(req, res, next) {

        let account = await accountRepository.create(req.body);
        const tokens = accountRepository.generateJWT(account.email)
        res.status(201).json({ account, tokens });
    }
}

new accountRoutes();
export default router;