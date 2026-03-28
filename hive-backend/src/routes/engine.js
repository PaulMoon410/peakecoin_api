const express = require("express");
const { hiveEngineFind } = require("../services/hiveEngineClient");

const router = express.Router();

router.get("/engine/balances/:account", async (req, res, next) => {
  try {
    const balances = await hiveEngineFind({
      contract: "tokens",
      table: "balances",
      query: { account: req.params.account },
      limit: req.query.limit,
    });

    return res.json({ ok: true, data: balances });
  } catch (error) {
    return next(error);
  }
});

router.get("/engine/trades", async (req, res, next) => {
  try {
    const symbol = req.query.symbol;
    const trades = await hiveEngineFind({
      contract: "market",
      table: "tradesHistory",
      query: symbol ? { symbol } : {},
      limit: req.query.limit || 50,
      indexes: [{ index: "timestamp", descending: true }],
    });

    return res.json({ ok: true, data: trades });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
