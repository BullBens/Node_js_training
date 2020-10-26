"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.AdviceSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    _author: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    _likes: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    _comments: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date_of: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
}, {
    collection: "comments",
});
//# sourceMappingURL=task.schema.js.map