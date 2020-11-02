"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    get secret() {
        return process.env.SECRET || "secret";
    }
    get tokenExpiresIn() {
        if (!process.env.TOKEN_EXPIRES_IN) {
            return 86400;
        }
        return parseFloat(process.env.TOKEN_EXPIRES_IN);
    }
    get connectionDatabaseString() {
        return (process.env.CONNECTION_DATABASE_STRING || "mongodb://127.0.0.1:27017");
    }
    get databaseName() {
        return process.env.DATABASE_NAME || "renko-local-database";
    }
    get sendGridApiKey() {
        return (process.env.SEND_GRID_API_KEY ||
            "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");
    }
    get emailConfirmUrl() {
        return (process.env.EMAIL_CONFIRM_URL ||
            "https://renko-api.herokuapp.com/auth/email-confirm?emailToken=");
    }
}
exports.Environments = new Environment();
//# sourceMappingURL=environment.js.map