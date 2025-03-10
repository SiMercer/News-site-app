const db = require("../db/connection");

const fetchArticlesByID = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      return rows[0];
    });
};

module.exports = { fetchArticlesByID };
