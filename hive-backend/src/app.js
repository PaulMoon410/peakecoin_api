const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const healthRoutes = require("./routes/health");
const hiveRoutes = require("./routes/hive");
const engineRoutes = require("./routes/engine");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api", healthRoutes);
app.use("/api", hiveRoutes);
app.use("/api", engineRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    ok: false,
    error: "Internal server error",
    message: err.message,
  });
});

module.exports = app;
