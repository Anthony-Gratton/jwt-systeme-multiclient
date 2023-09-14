import { Account } from "../models/account.model.js";

class AccountRepository {

    create(account) {
        try {
            return Account.create(account);
        } catch (err) {
            throw err;
        }
    }
}

export default new AccountRepository();