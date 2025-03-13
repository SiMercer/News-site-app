const db = require("../db/connection");

const fetchArticles = (req) => {
  const allowedQuery = [
    "sort_by",
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "order",
    "asc",
    "desc",
  ];
  let allowedQueryPassed = true;

  const parmsToCheck = [];

  Object.keys(req.query).forEach((objectKey) => {
    parmsToCheck.push(objectKey);
  });

  Object.values(req.query).forEach((valueKey) => {
    parmsToCheck.push(valueKey);
  });

  for (const value of parmsToCheck) {
    if (!allowedQuery.includes(value)) {
      allowedQueryPassed = false;
      break;
    }
  }

  if (allowedQueryPassed === false) {
    return Promise.reject({ status: 404, msg: "Invalid Input" });
  } else {
    let sort_by = "created_at";
    if (req.query.sort_by !== undefined) {
      sort_by = req.query.sort_by;
    }

    let order = "desc";
    if (req.query.order !== undefined) {
      order = req.query.order;
    }

    const queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY`;
    const queryParams = ` ${sort_by} ${order}`;

    return db.query(queryString + queryParams).then(({ rows }) => {
      return rows;
    });
  }
};

const fetchArticleByID = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID not found" });
      }
      return rows[0];
    });
};

const amendArticleByID = (id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`,
      [id, inc_votes]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID not found" });
      }
      return rows;
    });
};

const fetchCommentsByArticleByID = (id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID not found" });
      }
      return rows;
    });
};

module.exports = {
  fetchArticles,
  fetchArticleByID,
  amendArticleByID,
  fetchCommentsByArticleByID,
};
