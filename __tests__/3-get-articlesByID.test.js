// const endpointsJson = require("../endpoints.json");
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

describe("Testing 'GET' method for '/api/articles/:article_id' endpoint", () => {
  test("200: Responds with article of specified ID.", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const article = body.data;
        expect(article.article_id).toEqual(2);
        expect(article.title).toEqual("Sony Vaio; or, The Laptop");
        expect(article.topic).toEqual("mitch");
        expect(article.author).toEqual("icellusedkars");
        expect(article.body).toEqual("Call me Mitchell. Some years ago..");
        expect(article.created_at).toEqual("2020-10-16T05:03:00.000Z");
        expect(article.votes).toEqual(0);
        expect(article.article_img_url).toEqual(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });

  test("400: 'GET' method for '/api/articles/:article_id' when article_id is entered as NaN endpoint", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });

  test("400: 'GET' method for '/api/articles/:article_id' when article_id is entered as not in db", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
