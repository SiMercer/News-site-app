const db = require("../db/connection");

const fetchArticles = (sort_by, order, topic) => {
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

  let queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;
  const queryParamsDollas = [];
  //WHERE
  if (topic) {
    topicAsArr = [];
    if (Array.isArray(topic)) {
      topicAsArr = [...topic];
    } else {
      topicAsArr.push(topic);
    }

    let queryParamPos = 1;

    let queryStringDollasTemp = "";

    topicAsArr.forEach((element) => {
      queryParamsDollas.push(element);
      queryStringDollasTemp += "$" + queryParamPos + ", ";
      queryParamPos++;
    });
    const queryStringDollas = queryStringDollasTemp.slice(0, -2);
    queryString += ` WHERE articles.topic IN (${queryStringDollas})`;

    // WHERE articles.topic IN ($1, $2)

    queryParamPos++;
  }

  //GROUP BY
  queryString += ` GROUP BY articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url`;

  //ORDER BY

  if (allowedQuery.includes(sort_by)) {
    queryString += ` ORDER BY ${sort_by}`;
  } else {
    queryString += ` ORDER BY articles.created_at`;
  }

  if (allowedQuery.includes(order)) {
    if (order === "asc") {
      queryString += " asc";
    } else {
      queryString += "  desc";
    }
  }

  if (
    (order && !allowedQuery.includes(order)) ||
    (sort_by && !allowedQuery.includes(sort_by))
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db.query(queryString, queryParamsDollas).then(({ rows }) => {
    return rows;
  });
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
