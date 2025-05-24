import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// inite db

// init routes
app.get("/", (req, res, next) => {
  const strCompression = "HaHa";
  return res.status(200).json({
    message: "Welcome Toan!",
    metadata: strCompression.repeat(10000),
  });
});
// handling error

export default app;
