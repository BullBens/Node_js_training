import "reflect-metadata";
import "./di-container";
import app from "./app";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import "./common";
import { Environments } from "./environment/environment";
import { connect } from "mongoose";
const httpPort = 80;
const httpsPort = 443;

const port = process.env.PORT || httpPort;

(async () => {
  const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 1000, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: Environments.databaseName,
  };
  const connectWithRetry = () => {
    console.log("MongoDB connection with retry");
    connect(Environments.connectionDatabaseString, options)
      .then(() => {
        console.log("MongoDB is connected");
      })
      .catch((err) => {
        console.log(
          `Error!! ${JSON.stringify(err)} \n URI: ${process.env.MONGODB_URI} `
        );
        console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
        setTimeout(connectWithRetry, 5000);
      });
  };
  connectWithRetry();

  http.createServer(app).listen(port, () => {
    console.log("Express https server listening on port " + port);
  });
  // const server = http.createServer(app).listen(process.env.PORT, () => {
  //   console.log("Express http server listening on port " + process.env.PORT);
  // });
  // server;
})();
