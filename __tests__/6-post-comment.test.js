const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

/* Set up your test imports here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe.skip("POST /api/articles/:article_id/comments", () => {
  test("api/articles/:article_id/comments", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "grumpy19",
        body: "thisIsMyComment",
      })
      .expect(201)
      .then(({ comment }) => {
        console.log({ comment });
      });
  });
});
