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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const repositories_1 = require("../repositories");
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const feature_schema_1 = require("../schemas/feature.schema");
const common_1 = require("../common");
const FeatureModel = mongoose_1.model('features', feature_schema_1.FeatureSchema);
let FeatureService = class FeatureService {
    constructor(featureRepository) {
        this.featureRepository = featureRepository;
    }
    add(feature) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedFeature = yield FeatureModel.findOne({ id: feature.id });
            if (existedFeature) {
                throw new common_1.ApplicationError(`"Feature with ${feature.id} ID already exist!`);
            }
            const featureEntity = feature;
            this.featureRepository.add(featureEntity);
            const featureModel = featureEntity;
            return featureModel;
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const feature = yield this.featureRepository.get();
            return feature;
        });
    }
    remove(featureId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedFeature = yield FeatureModel.findOne({ id: featureId });
            if (!existedFeature) {
                throw new common_1.ApplicationError(`"Feature with ${featureId} ID doesn't exist!`);
            }
            const featureNewValue = yield this.featureRepository.remove(featureId);
            return featureNewValue;
        });
    }
    update(requestId, feature) {
        return __awaiter(this, void 0, void 0, function* () {
            const existedFeature = yield FeatureModel.findOne({ id: requestId });
            if (!existedFeature) {
                throw new common_1.ApplicationError(`"Feature with ${requestId} ID doesn't exist!`);
            }
            const featureNewValue = yield this.featureRepository.update(requestId, feature);
            return featureNewValue;
        });
    }
};
FeatureService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(repositories_1.FeatureRepository)),
    __metadata("design:paramtypes", [repositories_1.FeatureRepository])
], FeatureService);
exports.FeatureService = FeatureService;
//# sourceMappingURL=feature.service.js.map