const topics = require("../db/data/test-data/articles");
const {
  fetchArticles,
  fetchArticleByID,
  fetchCommentsByArticleByID,
} = require("../models/articles.models");

const getArticles = (req, res, next) => {
  fetchArticles(req)
    .then((articles) => {
      res.send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleByID = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleByID(id)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleByID = (req, res, next) => {
  const id = req.params.article_id;
  fetchCommentsByArticleByID(id)
    .then((comments) => {
      res.send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticles, getArticleByID, getCommentsByArticleByID };
