"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CommentSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    _author: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    message: {
        type: String,
    },
    date_of: {
        type: Date,
    },
}, {
    collection: "comments",
});
//# sourceMappingURL=comment.schema.js.map