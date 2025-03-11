const db = require("../db/connection");

const publishCommentsByArticleByID = () => {
  return db.query(`SELECT slug, description FROM topics`).then(({ rows }) => {
    return rows;
  });
};

module.exports = { publishCommentsByArticleByID };
