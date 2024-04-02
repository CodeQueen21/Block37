const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/store_db"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

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
        image VARCHAR(255),
        price INTEGER NOT NULL,
        stock INTEGER DEFAULT 5 NOT NULL
    );
    CREATE TABLE userProducts(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        product_id UUID REFERENCES products(id) NOT NULL,
        quantity INTEGER NOT NULL,
        purchased BOOLEAN DEFAULT FALSE
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
INSERT INTO users(id, firstName, lastName, email, password, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
`;
  const response = await client.query(SQL, [
    uuid.v4(),
    firstName,
    lastName,
    email,
    await bcrypt.hash(password, 5),
    is_admin,
  ]);
  return response.rows[0];
};

const createProduct = async ({ name, description, image, price, stock }) => {
  const SQL = `
INSERT INTO products(id, name, description, image, price, stock) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
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

const createUserProduct = async ({
  user_id,
  product_id,
  quantity,
  purchased,
}) => {
  const SQL = `
  INSERT INTO userProducts(id, user_id, product_id, quantity, purchased) VALUES($1, $2, $3, $4, $5) RETURNING *;
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    user_id,
    product_id,
    quantity,
    purchased,
  ]);
  return response.rows[0];
};

const fetchUserProducts = async () => {
  const SQL = `
        SELECT * FROM userProducts;
        `;
  const response = await client.query(SQL);
  return response.rows;
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

const fetchSingleUser = async ({ id }) => {
  const SQL = `
  SELECT id FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

const deleteUserProduct = async ({ user_id, id }) => {
  const SQL = `
  DELETE 
  FROM userProducts
  WHERE user_id = $1 AND id = $2
  `;
  await client.query(SQL, [user_id, id]);
};

const authenticate = async ({ email, password }) => {
  const SQL = `
  SELECT id, email FROM users WHERE email=$1;
  `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return { token: response.rows[0].id };
};

const findUserWithToken = async (id) => {
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (err) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
  SELECT id, email FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  createUserProduct,
  fetchUserProducts,
  fetchProducts,
  fetchUsers,
  deleteUserProduct,
  fetchSingleUser,
};
