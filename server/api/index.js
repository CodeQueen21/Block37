const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./users.route");
const productsRouter = require("./products.route");
const userProductsRouter = require("./userProducts.route");

apiRouter.use("/users", userRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/userProducts", userProductsRouter);

module.exports = apiRouter;
