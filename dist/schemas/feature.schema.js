"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.FeatureSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    id: String,
    name: String,
    type: String,
    dependencyOn: Array,
    image: String,
    description: String,
    date: Date,
    attributes: Array,
}, {
    collection: 'features'
});
//# sourceMappingURL=feature.schema.js.map