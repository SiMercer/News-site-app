const express = require("express");
const cors = require("cors");
const app = express();

const apiRequest = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticles,
  getArticleByID,
  patchArticleByID,
  postArticle,
} = require("./controllers/articles.controllers");

const {
  postCommentsByArticleByID,
  getCommentsByArticleByID,
  deleteCommentByID,
  patchCommentVotes,
} = require("./controllers/comments.controllers");

const {
  getUsers,
  getUserByUsername,
} = require("./controllers/users.controllers");

app.use(cors());

app.use(express.json());

app.get("/api", apiRequest);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.post("/api/articles", postArticle);

app.get("/api/articles/:article_id", getArticleByID);

app.patch("/api/articles/:article_id", patchArticleByID);

app.get("/api/articles/:article_id/comments", getCommentsByArticleByID);

app.post("/api/articles/:article_id/comments", postCommentsByArticleByID);

app.patch("/api/comments/:comment_id", patchCommentVotes);

app.delete("/api/comments/:comment_id", deleteCommentByID);

app.get("/api/users", getUsers);

app.get("/api/users/:username", getUserByUsername);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use((err, req, res, next) => {
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
