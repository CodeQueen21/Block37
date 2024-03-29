const {
  client,
  createTables,
  createUser,
  fetchUsers,
  fetchProducts,
  createProduct,
} = require("./db");
const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
const port = process.env.PORT || 3000;

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");

  const [Kayla, Dave] = await Promise.all([
    createUser({
      firstName: "Kayla",
      lastName: "White",
      email: "kayla@example.com",
      password: "shhh",
      is_admin: false,
    }),
    createUser({
      firstName: "Dave",
      lastName: "Brown",
      email: "dave@example.com",
      password: "shhhhi",
      is_admin: false,
    }),
    createUser({
      firstName: "Sarah",
      lastName: "Green",
      email: "sarah@example.com",
      password: "secret",
      is_admin: true,
    }),
    createProduct({
      name: "battery",
      description: "im a battery",
      image: "./images/battery.jpg",
      price: 6,
      stock: 10,
    }),
  ]);
  const users = await fetchUsers();
  const products = await fetchProducts();
  console.log(users);
  console.log(products);
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
