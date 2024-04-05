const {
  fetchUserProducts,
  deleteUserProduct,
  fetchSingleUserProduct,
  updateProduct,
  updateUserProduct,
} = require("../db");
const express = require("express");
const userProductsRouter = express.Router();

userProductsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUserProducts());
  } catch (error) {
    next(error);
  }
});

userProductsRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleUserProduct({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

userProductsRouter.put("/:id", async (req, res, next) => {
  try {
    res.status(201).send(
      await updateUserProduct({
        id: req.params.id,
        quantity: req.body.quantity,
        purchased: req.body.purchased,
      })
    );
  } catch (error) {
    next(error);
  }
});

userProductsRouter.delete(
  "/:user_id/userProducts/:id",
  async (req, res, next) => {
    try {
      res.status(204).send(
        await deleteUserProduct({
          id: req.params.id,
          user_id: req.params.user_id,
        })
      );
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userProductsRouter;
