const { fetchUserProducts, deleteUserProduct } = require("../db");
const express = require("express");
const userProductsRouter = express.Router();

userProductsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUserProducts());
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
