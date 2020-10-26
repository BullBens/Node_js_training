"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const feature_schema_1 = require("./../schemas/feature.schema");
exports.FeatureModel = mongoose_1.model('features', feature_schema_1.FeatureSchema);
let FeatureRepository = class FeatureRepository {
    constructor() { }
    add(featureEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            let newValue = yield exports.FeatureModel.create(featureEntity);
            featureEntity = newValue;
            return featureEntity;
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield exports.FeatureModel.find();
            return result;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let elem = yield exports.FeatureModel.findOne({ id: id });
            const filter = { _id: elem._id };
            let removeFeatureValue = yield exports.FeatureModel.findByIdAndDelete(filter);
            return removeFeatureValue;
        });
    }
    update(requestId, feature) {
        return __awaiter(this, void 0, void 0, function* () {
            let elem = yield exports.FeatureModel.findOne({ id: requestId });
            const filter = { _id: elem._id };
            let removeFeatureValue = yield exports.FeatureModel.updateOne(filter, feature, { new: true });
            return removeFeatureValue;
        });
    }
};
FeatureRepository = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FeatureRepository);
exports.FeatureRepository = FeatureRepository;
//# sourceMappingURL=feature.repository.js.map