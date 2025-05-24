import mongoose from "mongoose";
import os from "os";
import process from "process";

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of Connections:: ${numConnection}`);
};

const inSecond = 5000;

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * 5;

    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnections) {
      console.log(`Connection overload detected`);
    }
  }, inSecond);
};

export { countConnect, checkOverload };
