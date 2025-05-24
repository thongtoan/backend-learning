import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "dotenv/config";
import { instanceMongodb } from "./dbs/init.mongodb.js";
import { countConnect, checkOverload } from "./helpers/check.connect.js";

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
app.get("/", (req, res, next) => {
  const strCompression = "HaHa";
  return res.status(200).json({
    message: "Welcome Toan!",
  });
});
// handling error

export default app;
