"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_container_1 = require("../di-container");
const common_1 = require("../common");
class Routes {
    routes(app) {
        const controllers = di_container_1.diContainer.getAll("Controller");
        app.route("/").get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        for (const controller of controllers) {
            const routes = controller.routes();
            for (const route of routes) {
                if (route.type === "GET") {
                    app.route(route.route).get(common_1.ErrorHandler(route.handlers));
                }
                if (route.type === "POST") {
                    app.route(route.route).post(common_1.ErrorHandler(route.handlers));
                }
                if (route.type === "PUT") {
                    app.route(route.route).put(common_1.ErrorHandler(route.handlers));
                }
            }
        }
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map