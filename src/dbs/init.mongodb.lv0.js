import mongoose from "mongoose";

const connectString = `mongodb://localhost:27017/shopDev`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectString);
    console.log(`Connected MongoDB Success`);
  } catch (err) {
    console.log("Error Connect!", err);
  }

  if (1 === 0) {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });
  }
};

export default connectDB;
