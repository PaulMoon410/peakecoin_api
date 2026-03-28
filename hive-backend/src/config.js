const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
  port: Number(process.env.PORT || 3000),
  hiveApiUrl: process.env.HIVE_API_URL || "https://api.hive.blog",
  hiveEngineApiUrl:
    process.env.HIVE_ENGINE_API_URL || "https://api.hive-engine.com/rpc/contracts",
};
