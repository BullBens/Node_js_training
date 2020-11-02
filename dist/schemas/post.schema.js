"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.PostSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId || null,
        require: true,
    },
    message: {
        type: String,
        required: true,
    },
    location: {
        type: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
    },
}, {
    collection: "posts",
});
//# sourceMappingURL=post.schema.js.map