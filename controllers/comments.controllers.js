const {
  publishCommentsByArticleByID,
  removeCommentByID,
  fetchCommentsByArticleByID,
} = require("../models/comments.models");

const postCommentsByArticleByID = (req, res, next) => {
  publishCommentsByArticleByID(req)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleByID = (req, res, next) => {
  fetchCommentsByArticleByID(req)
    .then((comments) => {
      res.send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCommentByID = (req, res, next) => {
  removeCommentByID(req)
    .then((comment) => {
      res.status(204).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  postCommentsByArticleByID,
  getCommentsByArticleByID,
  deleteCommentByID,
};
