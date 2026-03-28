const express = require("express");
const {
  getAccount,
  getAccounts,
  getAccountHistory,
  getDynamicGlobalProperties,
} = require("../services/hiveClient");

const router = express.Router();

router.get("/hive/account/:name", async (req, res, next) => {
  try {
    const account = await getAccount(req.params.name);
    if (!account) {
      return res.status(404).json({ ok: false, error: "Account not found" });
    }

    return res.json({ ok: true, data: account });
  } catch (error) {
    return next(error);
  }
});

router.get("/hive/accounts", async (req, res, next) => {
  try {
    const names = String(req.query.names || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const accounts = await getAccounts(names);
    return res.json({ ok: true, data: accounts });
  } catch (error) {
    return next(error);
  }
});

router.get("/hive/account/:name/history", async (req, res, next) => {
  try {
    const history = await getAccountHistory(req.params.name, req.query.limit);
    return res.json({ ok: true, data: history });
  } catch (error) {
    return next(error);
  }
});

router.get("/hive/chain/properties", async (req, res, next) => {
  try {
    const properties = await getDynamicGlobalProperties();
    return res.json({ ok: true, data: properties });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
