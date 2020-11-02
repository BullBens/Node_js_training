"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    photo: {
        type: String || null,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    invitationHashCode: {
        type: String,
        required: true,
    },
    friends: {
        type: Array,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    },
    classification: {
        type: Number,
        required: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
}, {
    collection: "users",
});
//# sourceMappingURL=user.schema.js.map