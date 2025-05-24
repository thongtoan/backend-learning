import mongoose from "mongoose";
import app from "./src/app.js";
import { checkOverload } from "./src/helpers/check.connect.js";

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  server.close(() => console.log(`Server is closed`));

  clearInterval(checkOverload);
  try {
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed");
  } catch (err) {
    console.log("Error closing MongoDB", err);
  }

  process.exit(0);
});
