const { fetchUsers, fetchSingleUser, createUser } = require("../db");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleUser({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send(
      await createUser({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        is_admin: req.body.is_admin,
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
