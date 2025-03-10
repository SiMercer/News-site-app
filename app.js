const express = require("express");
const app = express();

const apiRequest = require("./controllers/api.controllers");
const { getTopics } = require("./controllers/topics.controllers");

app.use(express.json());

app.get("/api", apiRequest);

app.get("/api/topics", getTopics);

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error!" });
});

module.exports = app;
