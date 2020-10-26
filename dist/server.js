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
require("reflect-metadata");
require("./di-container");
const app_1 = require("./app");
const http = require("http");
require("./common");
const environment_1 = require("./environment/environment");
const mongoose_1 = require("mongoose");
const httpPort = 80;
const httpsPort = 443;
const port = process.env.PORT || httpPort;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        autoIndex: false,
        reconnectTries: 30,
        reconnectInterval: 1000,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: environment_1.Environments.databaseName,
    };
    const connectWithRetry = () => {
        console.log("MongoDB connection with retry");
        mongoose_1.connect(environment_1.Environments.connectionString, options)
            .then(() => {
            console.log("MongoDB is connected");
        })
            .catch((err) => {
            console.log(`Error!! ${JSON.stringify(err)} \n URI: ${process.env.MONGODB_URI} `);
            console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
            setTimeout(connectWithRetry, 5000);
        });
    };
    connectWithRetry();
    http.createServer(app_1.default).listen(port, () => {
        console.log("Express https server listening on port " + port);
    });
    // const server = http.createServer(app).listen(process.env.PORT, () => {
    //   console.log("Express http server listening on port " + process.env.PORT);
    // });
    // server;
}))();
//# sourceMappingURL=server.js.map