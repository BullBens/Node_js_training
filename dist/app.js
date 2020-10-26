"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const cors = require("cors");
const error_middleware_ts_1 = require("./middlewares/error.middleware.ts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        this.app = express();
        this.app.use(cors());
        // this.app.use(multer({ dest: "./uploads/" }));
        this.config();
        this.routePrv.routes(this.app);
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(error_middleware_ts_1.ErrorMiddleware);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static("public"));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map