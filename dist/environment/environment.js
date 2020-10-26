"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    get secret() {
        return process.env.secret || "secret";
    }
    get tokenExpiresIn() {
        if (!process.env.tokenExpiresIn) {
            return 86400;
        }
        return parseFloat(process.env.tokenExpiresIn);
    }
    get connectionString() {
        return (
        // process.env.connectionString ||
        "mongodb+srv://bullbens:Inner_world_Lq3Pck2irDam@renkocluster.lbd9i.mongodb.net/renkodb?retryWrites=true&w=majority");
    }
    get databaseName() {
        return (
        // process.env.databaseName ||
        "renkodb");
    }
    get sendGridApiKey() {
        return (
        // process.env.sendGridApiKey ||
        "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");
    }
    get emailConfirmUrl() {
        return "https://renko-api.herokuapp.com/auth/email-confirm?emailToken=";
    }
}
exports.Environments = new Environment();
//# sourceMappingURL=environment.js.map