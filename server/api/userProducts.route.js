const { fetchUserProducts } = require("../db");
const express = require("express");
const userProductsRouter = express.Router();

userProductsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUserProducts());
  } catch (error) {
    next(error);
  }
});

module.exports = userProductsRouter;
