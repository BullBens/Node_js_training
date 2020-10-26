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
exports.errorWrapper = (requestHandler) => {
    const errorHandlerWrapper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield requestHandler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
    return errorHandlerWrapper;
};
exports.ErrorHandler = (handlers) => {
    var newHandlers = [];
    for (let handler of handlers) {
        newHandlers.push(exports.errorWrapper(handler));
    }
    return newHandlers;
};
//# sourceMappingURL=error-handler.js.map