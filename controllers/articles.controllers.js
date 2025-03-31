const {
  fetchArticles,
  fetchArticleByID,
  amendArticleByID,
  addArticle,
} = require("../models/articles.models");

const getArticles = (req, res, next) => {
  const { sort_by, order, topic, p, limit } = req.query;

  fetchArticles(sort_by, order, topic, p, limit)
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

const postArticle = (request, response, next) => {
  const { author, title, body, topic, article_img_url } = request.body;

  addArticle(author, title, body, topic, article_img_url)
    .then((article) => {
      response.status(201).send({ article: article });
    })
    .catch((error) => {
      next(error);
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
  postArticle,
};
