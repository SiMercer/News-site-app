const db = require("../db/connection");

const publishCommentsByArticleByID = (req) => {
  const articleid = req.params.article_id;
  const { username, body } = req.body;

  console.log(
    "data to be inserted in table:",
    "articleid = ",
    articleid,
    ", username = ",
    username,
    ", body = ",
    body
  );

  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`,
      [articleid, username, body]
    )
    .then(({ rows }) => {
      console.log("DOSE .THEN RUN?");
      return rows[0];
    });
};

// const vote = 0;
// console.log(articleid, username, body, vote);

// return db.query(
//   `INSERT INTO comments (article_id, author, body, vote, created_at) VALUES ($1, $2, $3, $4, TIMESTAMP) RETURNING *`,
//   [articleid, username, body, vote].then(({ rows }) => {
//     console.log("DOSE .THEN RUN?");
//     return rows[0];
//   })
// );

module.exports = { publishCommentsByArticleByID };
