const {
  client,
  createTables,
  createUser,
  createProduct,
  createUserProduct,
  fetchUsers,
  fetchProducts,
  fetchUserProducts,
} = require("./db");
const path = require("path");
const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "images")));

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");

  const [Kayla, Dave, Sarah, battery] = await Promise.all([
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
      image: "battery.jpg",
      price: 6,
      stock: 10,
    }),
    createProduct({
      name: "radio",
      description: "im a radio",
      image: "radio.jpeg",
      price: 6,
      stock: 10,
    }),
    createProduct({
      name: "blender",
      description: "im a blender",
      image: "blender.jpeg",
      price: 6,
      stock: 10,
    }),
  ]);
  const users = await fetchUsers();
  console.log(users);
  const products = await fetchProducts();
  console.log(products);

  const userProducts = await Promise.all([
    createUserProduct({
      user_id: Kayla.id,
      product_id: battery.id,
      quantity: 1,
      purchased: false,
    }),
  ]);
  const usersProducts = await fetchUserProducts();
  console.log(usersProducts);
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
