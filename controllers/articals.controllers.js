const {
  fetchArticles,
  fetchArticleByID,
  amendArticleByID,
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

const patchArticleByID = (req, res, next) => {
  const id = req.params.article_id;
  const inc_votes = req.body.inc_votes;
  amendArticleByID(id, inc_votes)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  getArticleByID,
  patchArticleByID,
};
