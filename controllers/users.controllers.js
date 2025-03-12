const { fetchUsers } = require("../models/users.models");

const getUsers = (req, res, next) => {
  fetchUsers(req)
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUsers };
