const { publishCommentsByArticleByID } = require("../models/comments.models");

const postCommentsByArticleByID = (req, res, next) => {
  publishCommentsByArticleByID(req)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { postCommentsByArticleByID };
