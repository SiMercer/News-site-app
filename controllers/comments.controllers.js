const {
  publishCommentsByArticleByID,
  removeCommentByID,
  fetchCommentsByArticleByID,
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
  const { article_id } = request.params;
  const { page, limit } = request.query;
  fetchCommentsByArticleByID(article_id, page, limit)
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
