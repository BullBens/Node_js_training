import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as cors from "cors";
import { ErrorMiddleware } from "./middlewares/error.middleware.ts";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.app.use(cors());
    // this.app.use(multer({ dest: "./uploads/" }));
    this.config();
    this.routePrv.routes(this.app);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    this.app.use(ErrorMiddleware);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // serving static files
    this.app.use(express.static("public"));
  }
}

export default new App().app;
