const express = require("express");
const app = express();

const apiRequest = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticles,
  getArticleByID,
  getCommentsByArticleByID,
} = require("./controllers/articals.controllers");

const {
  postCommentsByArticleByID,
} = require("./controllers/comments.controllers");

app.use(express.json());

app.get("/api", apiRequest);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleByID);

app.post("/api/articles/:article_id/comments", postCommentsByArticleByID);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not found" });
  }
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
