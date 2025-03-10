const endpoints = require("../endpoints.json");

const apiRequest = (req, res) => {
  res.status(200).send({ endpoints });
};

module.exports = apiRequest;
