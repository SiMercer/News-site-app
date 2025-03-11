const topics = require("../db/data/test-data/articles");
const {
  fetchArticles,
  fetchArticleByID,
} = require("../models/articles.models");

const getArticles = (req, res, next) => {
  fetchArticles(req)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleByID = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleByID(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticles, getArticleByID };
