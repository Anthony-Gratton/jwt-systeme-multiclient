import { v4 as uuidv4 } from 'uuid'
import HttpError from 'http-errors';
import { Account } from "../models/account.model.js";
import argon2d from 'argon2';

class AccountRepository {

    async login(email, username, password) {
        const account = await Account.findOne({ $or: [{ email: email }, { username: username }] })
        if (!account) {
            return { err: HttpError.Unauthorized() }
        }

        if (await this.validatePassword(password, account)) {
            return { account };
        } else {
            //bad password
            return { err: HttpError.Unauthorized() }
        }



    }

    generateJWT() {

    }

    //verify password with argon
    async validatePassword(password, account) {

        try {
            return await argon2d.verify(account.passwordHash, password)
        } catch (err) {
            throw err
        }
    }

    async create(account) {
        try {
            account.uuid = uuidv4();
            account.passwordHash = await argon2d.hash(account.password)
            delete account.password;
            return Account.create(account);
        } catch (err) {
            throw err;
        }
    }
}

export default new AccountRepository();