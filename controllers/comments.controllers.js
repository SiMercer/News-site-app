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
  console.log("I AM BEING CALLED");
  removeCommentByID(req)
    .then((comment) => {
      console.log(comment);
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
