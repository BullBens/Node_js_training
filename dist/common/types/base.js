"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationError {
    constructor(message, stack) {
        this.message = message;
        this.name = "ApplicationError";
        this.stack = stack;
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=base.js.map