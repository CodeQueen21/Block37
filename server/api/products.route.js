const { fetchProducts, fetchSingleProduct } = require("../db");
const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleProduct({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
