const topics = require("../db/data/test-data/topics");
const { fetchTopics } = require("../models/topics.models");

const getTopics = (req, res) => {
  fetchTopics().then((data) => {
    res.send(data);
  });
};

module.exports = { getTopics };
