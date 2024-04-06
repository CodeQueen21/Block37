const {
  createTables,
  createUser,
  createProduct,
  createUserProduct,
  fetchUsers,
  fetchProducts,
  fetchUserProducts,
  fetchSingleUser,
  deleteUserProduct,
} = require("./db");

//creating the individual pieces of data
const seedUsers = async () => {
  return await Promise.all([
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
  ]);
};
const seedProducts = async () => {
  return await Promise.all([
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
};
const seedUserProducts = async (users, products) => {
  const [Kayla, Dave] = users;
  const [battery, blender, radio] = products;
  return await Promise.all([
    createUserProduct({
      user_id: Kayla.id,
      product_id: battery.id,
      quantity: 1,
      purchased: false,
    }),
    createUserProduct({
      user_id: Kayla.id,
      product_id: blender.id,
      quantity: 2,
      purchased: false,
    }),
    createUserProduct({
      user_id: Dave.id,
      product_id: radio.id,
      quantity: 5,
      purchased: false,
    }),
  ]);
};

// exports a function that seeds the data
module.exports = async () => {
  await createTables();
  console.log("tables created");
  const users = await seedUsers();
  const products = await seedProducts();
  const userProducts = await seedUserProducts(users, products);
  // console.log(users);
  console.log(products);
  console.log(userProducts);
  // console.log(users[0]);
  //console.log(await fetchSingleUser({ id: users[0].id }));
};
