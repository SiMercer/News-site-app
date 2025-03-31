const { fetchUsers, fetchUserByUsername } = require("../models/users.models");

const getUsers = (req, res, next) => {
  fetchUsers(req)
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

function getUserByUsername(request, response, next) {
  const { username } = request.params;

  fetchUserByUsername(username)
    .then((user) => response.status(200).send({ user: user }))
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUsers, getUserByUsername };
