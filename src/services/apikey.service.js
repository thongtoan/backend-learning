import { log } from "console";
import ApiKeyModel from "../models/apikey.model.js";
import crypto from "crypto";

const findById = async (key) => {
  //   const newKey = await ApiKeyModel.create({
  //     key: crypto.randomBytes(64).toString("hex"),
  //     permissions: ["0000"],
  //   });
  //   console.log(111, newKey);

  const objKey = await ApiKeyModel.findOne({ key, status: true }).lean();
  return objKey;
};

export { findById };
