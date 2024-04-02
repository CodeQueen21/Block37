const express = require("express");
const userProductsRouter = express.Router();
const client = require("./db");

userProductsRouter.get("/users", async (req, res, next) => {
  try {
    res.send(await client.fetchUsers());
  } catch (err) {
    next(err);
  }
});

module.exports = userProductsRouter;
