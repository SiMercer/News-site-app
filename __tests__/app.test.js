const endpointsJson = require("../endpoints.json");
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
/* Set up your beforeEach & afterAll functions here */

describe("1 - CORE: GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

// 2-
describe("2 - CORE: GET /api/topics", () => {
  test("200: Responds with an array containing each topic", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });

  test("200: Responds with an array containing only a slug & description for each topic", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body[0].slug).toEqual("mitch");
        expect(body[0].description).toEqual("The man, the Mitch, the legend");
        expect(body[0].img_url).toBe(undefined);
      });
  });
});

//3

describe("3 - CORE: GET /api/articles/:article_id", () => {
  test("200: Responds with article of specified ID.", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(article.article_id).toEqual(2);
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

//4

describe("4 - CORE: GET /api/articles", () => {
  test("200: responds with array of nested objects.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
        expect(typeof body.articles[0]).toBe("object");
      });
  });

  test("200: nested objects contains correct properties.", () => {
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

  test("400: additional Url elements added", () => {
    return request(app)
      .get("/api/articles/additionalUrlElementsAdded")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("404: return error if query used.", () => {
    return request(app)
      .get("/api/articles?additionalUrl=ElementsAdded")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });
});

// 5

describe("5 - CORE: GET /api/articles/:article_id/comments", () => {
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

// 6

describe("6 - CORE: POST /api/articles/:article_id/comments", () => {
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

// 7

describe("7 - CORE: PATCH /api/articles/:article_id", () => {
  test("200: add to vote tally.", () => {
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

  test("200: subtract from vote tally.", () => {
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

// 8

describe("8 - CORE: DELETE /api/comments/:comment_id", () => {
  test("204: DELETE. remove comment by ID.", () => {
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

// 9

describe("9 - CORE: GET /api/users", () => {
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
  test("404: miscellaneous characters added to endpoint.", () => {
    return request(app)
      .get("/api/users/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
});

/////////// 10

10;

describe("10 - CORE: GET /api/articles (sorting queries)", () => {
  test("200: no query responds with defaults 'sort_by=created_at' & 'order=desc.'", () => {
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

  test("404: any query key or value not listed in 'allowedQuery' gets rejected before db.query is run, example bad key  .", () => {
    return request(app)
      .get("/api/articles?sort_by_maliciouscode=votes&order=asc")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });

  test("404: any query key or value not listed in 'allowedQuery' gets rejected before db.query is run, example bad value  .", () => {
    return request(app)
      .get("/api/articles?sort_by=maliciouscode&order=asc")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });
});
