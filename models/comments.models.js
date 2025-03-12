const db = require("../db/connection");

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

module.exports = { publishCommentsByArticleByID };
