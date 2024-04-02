const { fetchUsers, fetchSingleUser } = require("../db");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/user", async (req, res, next) => {
  try {
    res.send(await fetchSingleUser());
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
