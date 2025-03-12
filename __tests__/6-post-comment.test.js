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

describe("201: POST /api/articles/:article_id/comments", () => {
  test("add a comment for an article.", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "rogersop",
        body: "thisIsMyTestComment",
      })
      .expect(201)
      .then(({ body }) => {
        const comment = body.comment;
        const commentCreatedAt = Date.parse(comment.created_at);
        expect(comment.comment_id).toBe(19);
        expect(comment.body).toBe("thisIsMyTestComment");
        expect(comment.article_id).toBe(1);
        expect(comment.author).toBe("rogersop");
        expect(comment.votes).toBe(0);
        expect(commentCreatedAt).toBeGreaterThanOrEqual(Date.parse(new Date()));
      });
  });
});

describe("400: POST /api/articles/:article_id/comments", () => {
  test("invaild end point.", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({
        username: "rogersop",
        body: "thisIsMyTestComment",
      })
      .expect(400)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("404: POST /api/articles/:article_id/comments", () => {
  test("username not found in users table.", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "simon",
        body: "thisIsMyTestComment",
      })
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Not found");
      });
  });

  test("articles ID not found.", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({
        username: "rogersop",
        body: "thisIsMyTestComment",
      })
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Not found");
      });
  });
});
