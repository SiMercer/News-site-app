const e = require("express");
const db = require("../db/connection");

const fetchArticles = (req) => {
  if (Object.keys(req.query).length === 0) {
    return db
      .query(
        `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC`
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 400, msg: "Bad request44" });
        }
        return rows;
      });
  }
  return Promise.reject({ status: 400, msg: "Bad request" });
};

const fetchArticleByID = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      return rows[0];
    });
};

module.exports = { fetchArticles, fetchArticleByID };
