
import express from "express";
import accountRepository from "../repositories/account.repository.js";

const router = express.Router();

class accountRoutes {

    constructor() {

        router.post('/', this.post);

    }

    async post(req, res, next) {

        let account = await accountRepository.create(req.body);
        res.status(201).json(account);
    }
}

new accountRoutes();
export default router;