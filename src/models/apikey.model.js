import mongoose, { model } from "mongoose";

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";

const apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const ApiKeyModel = model(DOCUMENT_NAME, apiKeySchema);
export default ApiKeyModel;
