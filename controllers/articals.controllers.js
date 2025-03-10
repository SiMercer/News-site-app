const topics = require("../db/data/test-data/articles");
const { fetchArticlesByID } = require("../models/articles.models");

const getArticlesByID = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticlesByID(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticlesByID };
