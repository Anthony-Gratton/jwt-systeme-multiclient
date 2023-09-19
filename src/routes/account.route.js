
import express from "express";
import HttpError from "http-errors";
import accountRepository from "../repositories/account.repository.js";

const router = express.Router();

class accountRoutes {

    constructor() {

        router.post('/', this.post);
        router.post('/actions/login', this.login)




    }

    async login(req, res, next) {
        const { email, username, password } = req.body
        if ((email && username) || email === "" || username == "") {
            return next(HttpError.BadRequest('Provide either email or username'))
        }
        const result = await accountRepository.login(email, username, password)
        if (result.account) {
            let account = result.account.toObject({ getters: false, virtuals: false })
            //generate jwt tokens

            res.status(201).json(account)
        } else {
            return next(result.err)
        }
    }

    async post(req, res, next) {

        let account = await accountRepository.create(req.body);
        res.status(201).json(account);
    }
}

new accountRoutes();
export default router;