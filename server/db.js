const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/store_db"
);
const uuid = require("uuid");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS userProducts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        firstName VARCHAR(25),
        lastName VARCHAR(25),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE products(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image BYTEA,
        price INTEGER NOT NULL,
        stock INTEGER DEFAULT 5 NOT NULL
    );
   
    `;
  await client.query(SQL);
};

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  is_admin,
}) => {
  const SQL = `
INSERT INTO users(id, firstName, lastName, email, password, is_admin) VALUES($1, $2, $3, $4, $5, $6)
`;
  const response = await client.query(SQL, [
    uuid.v4(),
    firstName,
    lastName,
    email,
    password,
    is_admin,
  ]);
  return response.rows[0];
};

const createProduct = async ({ name, description, image, price, stock }) => {
  const SQL = `
INSERT INTO products(id, name, description, image, price, stock) VALUES($1, $2, $3, $4, $5, $6)
`;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    description,
    image,
    price,
    stock,
  ]);
  return response.rows[0];
};

const fetchProducts = async () => {
  const SQL = `
      SELECT * FROM products;
      `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchUsers = async () => {
  const SQL = `
    SELECT * FROM users;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  fetchProducts,
  fetchUsers,
};
