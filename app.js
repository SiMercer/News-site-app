const express = require("express");
const app = express();

const apiRequest = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticles,
  getArticleByID,
} = require("./controllers/articals.controllers");

app.use(express.json());

app.get("/api", apiRequest);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleByID);

app.use((err, req, res, next) => {
  //   console.log(err.code);
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request" });
  } else {
    res.status(err.status).send({ message: err.msg });
  }
});

module.exports = app;
