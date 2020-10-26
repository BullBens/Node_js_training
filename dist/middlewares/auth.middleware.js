"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_container_1 = require("../di-container");
const common_1 = require("../common");
exports.AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    var token = request.headers["x-access-token"];
    if (!token) {
        return res.status(401).send({ auth: false, message: "No token provided." });
    }
    const jwtHelper = di_container_1.diContainer.get(common_1.JwtHelper);
    jwtHelper
        .verify(token)
        .then((authContext) => {
        if (!authContext.confirmed) {
            return res
                .status(401)
                .send({ auth: false, message: "Account is not active" });
        }
        request.user = authContext;
        next();
        return;
    })
        .catch((err) => {
        return res
            .status(401)
            .send({ auth: false, message: "Failed to authenticate token." });
    });
});
//# sourceMappingURL=auth.middleware.js.map