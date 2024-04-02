const { client, fetchUsers, fetchProducts } = require("./db");
const seed = require("./seed");
const path = require("path");
const express = require("express");
const apiRouter = require("./api");

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "images")));
app.use("/api", apiRouter);


const init = async () => {
  await client.connect();
  console.log("connected to database");
  await seed();
  console.log("data seeded");
  // const users = await fetchUsers();
  // console.log(users);
  // const products = await fetchProducts();
  // console.log(products);

  // console.log(userProducts);
  // await deleteUserProduct(userProducts[0]);
  // console.log(await fetchUserProducts(Kayla.id));

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
