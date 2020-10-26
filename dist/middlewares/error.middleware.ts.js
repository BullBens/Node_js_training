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
exports.ErrorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.headersSent) {
        return next(err);
    }
    if (err && err.name && err.name === "ApplicationError") {
        res.statusCode = 400;
        res.send(err.message);
        return;
    }
    res.sendStatus(500).send("Internal Server Error!");
});
//# sourceMappingURL=error.middleware.ts.js.map