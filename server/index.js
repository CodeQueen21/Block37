const { client, createTables, createUser, fetchUsers } = require("./db");
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
  ]);
  const users = await fetchUsers();
  console.log(users);
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
