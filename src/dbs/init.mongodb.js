import mongoose from "mongoose";
import config from "../config/config.mongodb.js";

const connectString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
console.log("Connect String::", connectString);
class Database {
  constructor() {
    this.connect();
  }

  async connect(type = "mongodb") {
    try {
      await mongoose.connect(connectString);
      console.log(`Connected MongoDB Success`);
    } catch (err) {
      console.log("Error Connect!", err);
    }

    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export { instanceMongodb };
