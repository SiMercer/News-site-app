const { fetchTopics } = require("../models/topics.models");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.send(topics);
  });
};

module.exports = { getTopics };
