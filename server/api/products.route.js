const { fetchProducts } = require("../db");
const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
