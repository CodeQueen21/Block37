const { fetchProducts, fetchSingleProduct, createProduct } = require("../db");
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

productsRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send(
      await createProduct({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
