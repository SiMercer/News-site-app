const endpointsJson = require("../endpoints.json");
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

// GET /api
describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint.", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

// GET /api/topics
describe("GET /api/topics", () => {
  test("200: Responds with an array containing only a slug & description for each topic.", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((topics) => {
          expect(typeof topics.slug).toBe("string");
          expect(typeof topics.description).toBe("string");
        });
      });
  });
});

// GET /api/articles
describe("GET /api/articles", () => {
  test("200:when no query responds with defaults 'sort_by=created_at' & 'order=desc.'", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });

  test("200: query for 'order' only, responds with default 'sort_by=created_at'.", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });

  test("200: query for 'sort_by' & 'order' in conjunction responds'.", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });

  test("200: query for 'sort_by=votes&order=asc' responds correctly'.", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        const article = body.articles[0];

        expect(article.author).toBe("icellusedkars");
        expect(article.title).toBe("Am I a cat?");
        expect(article.article_id).toBe(11);
        expect(article.created_at).toBe("2020-01-15T22:21:00.000Z");
        expect(article.votes).toBe(0);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
        expect(article.comment_count).toBe("0");
      });
  });

  test("200: query for 'sort_by' only, responds with default 'order=desc'", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });

  test("200: query for 'sort_by=votes&order=desc' responds correctly'.", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=desc")
      .expect(200)
      .then(({ body }) => {
        const article = body.articles[0];
        expect(article.author).toBe("butter_bridge");
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.article_id).toBe(1);
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(100);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
        expect(article.comment_count).toBe("11");
      });
  });

  test("200: can filter by single topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(10);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
  test("200: can filter by multiple topics", () => {
    return request(app)
      .get("/api/articles?topic=mitch&topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });

  test("200: querys work in conjunction", () => {
    return request(app)
      .get("/api/articles?topic=cats&sort_by=votes&order=desc")
      .expect(200)
      .then(({ body }) => {
        const article = body.articles[0];
        expect(article.author).toBe("butter_bridge");
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.article_id).toBe(1);
        expect(article.topic).toBe("cats");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(100);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
        expect(article.comment_count).toBe("11");
      });
  });

  test("200: any query keys not included in'allowedQuery' gets ignored.", () => {
    return request(app)
      .get("/api/articles?sort_by_maliciouscode=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        const article = body.articles[0];
        expect(article.author).toBe("icellusedkars");
        expect(article.title).toBe("Z");
        expect(article.article_id).toBe(7);
        expect(article.topic).toBe("mitch");
        expect(article.created_at).toBe("2020-01-07T14:08:00.000Z");
        expect(article.votes).toBe(0);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
        expect(article.comment_count).toBe("0");
      });
  });

  test("404: 'sort_by' or 'order' querys with value not listed in 'allowedQuery' returns 'Bad request'.", () => {
    return request(app)
      .get("/api/articles?sort_by=maliciouscode&order=asc")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

// GET /api/articles/:article_id
describe("GET /api/articles/:article_id", () => {
  test("200: Responds with article of specified ID.", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(article.author).toBe("icellusedkars");
        expect(article.title).toBe("Sony Vaio; or, The Laptop");
        expect(article.article_id).toBe(2);
        expect(article.body).toBe("Call me Mitchell. Some years ago..");
        expect(article.topic).toBe("cats");
        expect(article.created_at).toBe("2020-10-16T05:03:00.000Z");
        expect(article.votes).toBe(0);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
        expect(article.comment_count).toBe(0);
      });
  });

  test("400: when article_id is entered as NaN endpoint", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("400: when article_id is entered as not in db", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});

// PATCH /api/articles/:article_id
describe("PATCH /api/articles/:article_id", () => {
  test("200: add to vote tally.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 50 })
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("cats");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(150);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });

  test("200: subtract from vote tally.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -50 })
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("cats");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(article.votes).toBe(50);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });

  test("400: invaild end point.", () => {
    return request(app)
      .patch("/api/articles/banana")
      .send({ inc_votes: 50 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("400: vote value NaN.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "fifty" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("404: articles ID not found.", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 50 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});

// GET /api/articles/:article_id/comments
describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with array of nested objects.", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments.length).toBeGreaterThan(0);
        expect(typeof body.comments[0]).toBe("object");
      });
  });
  test("200: nested objects contains correct properties.", () => {
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
  test("400: if article_id is entered as NaN endpoint", () => {
    return request(app)
      .get("/api/articles/NaN/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: if article_id is entered as not in db", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});

// POST /api/articles/:article_id/comments
describe("POST /api/articles/:article_id/comments", () => {
  test("201: add a comment for an article.", () => {
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

  test("400: invaild end point.", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({
        username: "rogersop",
        body: "thisIsMyTestComment",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("404: username not found in users table.", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "simon",
        body: "thisIsMyTestComment",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("404: articles ID not found.", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({
        username: "rogersop",
        body: "thisIsMyTestComment",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

// DELETE /api/comments/:comment_id
describe("DELETE /api/comments/:comment_id", () => {
  test("204:remove comment by ID.", () => {
    return request(app).delete("/api/comments/2");
  });

  test("400: invalid comment_id.", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("404: comment ID not found.", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});

// GET /api/users
describe("GET /api/users", () => {
  test("200: nested objects contain correct user properties.", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        body.users.forEach((users) => {
          expect(typeof users.username).toBe("string");
          expect(typeof users.name).toBe("string");
          expect(typeof users.avatar_url).toBe("string");
        });
      });
  });
});

// All /*
describe("All /*", () => {
  test("404: catch all for any undefined paths.", () => {
    return request(app)
      .get("/api/users/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
});
