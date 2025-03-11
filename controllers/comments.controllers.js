const { publishCommentsByArticleByID } = require("../models/comments.models");

const postCommentsByArticleByID = (req, res, next) => {
  publishCommentsByArticleByID(req)
    .then((articles) => {
      res.send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { postCommentsByArticleByID };
