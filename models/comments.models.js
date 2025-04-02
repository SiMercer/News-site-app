const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

const publishCommentsByArticleByID = (req) => {
  const articleid = req.params.article_id;
  const { username, body } = req.body;
  const timeCreated = new Date();

  return db
    .query(
      `INSERT INTO comments (article_id, author, body, created_at, votes) VALUES ($1, $2, $3, $4, 0) RETURNING *`,
      [articleid, username, body, timeCreated]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

function fetchCommentsByArticleID(article_id, page, limit) {
  let query = `SELECT comment_id, votes, created_at::text AS created_at, author, body, article_id FROM comments where article_id = $1 ORDER BY created_at DESC`;

  let queryParams = [article_id];
  let queryParamCount = 2;

  if (limit) {
    query += ` LIMIT $${queryParamCount}`;
    queryParams.push(limit);
    queryParamCount++;
  }

  if (page) {
    const offset = Number(page) * Number(limit);
    query += ` OFFSET $${queryParamCount}`;
    queryParams.push(offset);
  }

  return db.query(query, queryParams).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "ID not found" });
    }
    return rows;
  });
}

function amendCommentVotes(inc_votes, commentId) {
  const values = [inc_votes, commentId];

  return db
    .query(
      `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *, created_at::text AS created_at`,
      values
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows[0];
    });
}

const removeCommentByID = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID not found" });
      }
      return rows[0];
    });
};

module.exports = {
  publishCommentsByArticleByID,
  fetchCommentsByArticleID,
  removeCommentByID,
  amendCommentVotes,
};
