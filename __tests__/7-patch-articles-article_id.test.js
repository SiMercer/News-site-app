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

describe("200: PATCH /api/articles/:article_id", () => {
  test("add to vote tally.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 50 })
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(150);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });

  test("subtract from vote tally.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -50 })
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(50);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
});

describe("400: PATCH /api/articles/:article_id", () => {
  test("invaild end point.", () => {
    return request(app)
      .patch("/api/articles/banana")
      .send({ inc_votes: 50 })
      .expect(400)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Bad request");
      });
  });

  test("vote value NaN.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "fifty" })
      .expect(400)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("404: PATCH /api/articles/:article_id", () => {
  test("articles ID not found.", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 50 })
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe("ID not found");
      });
  });
});
