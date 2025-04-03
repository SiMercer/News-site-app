const {
  publishCommentsByArticleByID,
  removeCommentByID,
  fetchCommentsByArticleID,
  amendCommentVotes,
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
  const { article_id } = req.params;
  const { page, limit } = req.query;

  fetchCommentsByArticleID(article_id, page, limit)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCommentByID = (req, res, next) => {
  const article_id = req.params.comment_id;
  removeCommentByID(article_id)
    .then((comment) => {
      res.send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

function patchCommentVotes(request, response, next) {
  const { comment_id } = request.params;
  const { inc_votes } = request.body;

  amendCommentVotes(inc_votes, comment_id)
    .then((comment) => {
      response.status(200).send({ comment: comment });
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  postCommentsByArticleByID,
  getCommentsByArticleByID,
  deleteCommentByID,
  patchCommentVotes,
};
