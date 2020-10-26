"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.EventSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    _author: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    geo: {
        latitude: Number,
        longitude: Number,
    },
    kind: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    date_of: {
        type: Date,
        required: true,
    },
    likes: {
        type: Array,
        require: true,
    },
    comments: [],
}, {
    collection: "events",
});
//# sourceMappingURL=event.schema.js.map