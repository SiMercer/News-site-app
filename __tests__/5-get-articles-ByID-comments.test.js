// const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("200: Testing 'GET' method for /api/articles/:article_id/comments endpoint", () => {
  test("responds with array of nested objects.", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments.length).toBeGreaterThan(0);
        expect(typeof body.comments[0]).toBe("object");
      });
  });
});
test("nested objects contains correct properties.", () => {
  return request(app)
    .get("/api/articles/1/comments")
    .expect(200)
    .then(({ body }) => {
      body.comments.forEach((comment) => {
        expect(typeof comment.author).toBe("string");
        expect(typeof comment.comment_id).toBe("number");
        expect(typeof comment.votes).toBe("number");
        expect(typeof comment.article_id).toBe("number");
        expect(typeof comment.created_at).toBe("string");
        expect(typeof comment.body).toBe("string");
      });
    });
});

describe("400: Testing 'GET' method for /api/articles/:article_id/comments endpoint", () => {
  test("400: 'GET' method for '/api/articles/:article_id/comments' when article_id is entered as NaN endpoint", () => {
    return request(app)
      .get("/api/articles/NaN/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: 'GET' method for '/api/articles/:article_id/comments' when article_id is entered as not in db", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});
