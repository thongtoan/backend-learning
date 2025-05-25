import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "dotenv/config";
import { instanceMongodb } from "./dbs/init.mongodb.js";
import { countConnect, checkOverload } from "./helpers/check.connect.js";
import router from "./routes/index.js";

const app = express();

// console.log(`process`, process.env);
// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// inite db
countConnect();
// checkOverload();

// init routes
app.use("", router);

// handling error

export default app;
