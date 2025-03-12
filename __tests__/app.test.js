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

describe("GET /api", () => {
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
describe.skip("Testing 'GET' method for '/api/topics' endpoint", () => {
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

describe("Testing 'GET' method for '/api/articles/:article_id' endpoint", () => {
  test("200: Responds with article of specified ID.", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(article.article_id).toEqual(2);
      });
  });

  test("400: 'GET' method for '/api/articles/:article_id' when article_id is entered as NaN endpoint", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("400: 'GET' method for '/api/articles/:article_id' when article_id is entered as not in db", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});

//4

describe("200: Testing 'GET' method for '/api/articles/' endpoint", () => {
  test("responds with array of nested objects.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
        expect(typeof body.articles[0]).toBe("object");
      });
  });

  test("nested objects contains correct properties.", () => {
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
});

describe("400: Testing 'GET' method for '/api/articles/' endpoint", () => {
  test("additional Url elements added", () => {
    return request(app)
      .get("/api/articles/additionalUrlElementsAdded")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("return error if query used.", () => {
    return request(app)
      .get("/api/articles?additionalUrl=ElementsAdded")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

// 5

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

// 6

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
        expect(body.msg).toBe("Not found");
      });
  });
});

// 7

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
        expect(body.msg).toBe("Bad request");
      });
  });

  test("vote value NaN.", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "fifty" })
      .expect(400)
      .then(({ body }) => {
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
        expect(body.msg).toBe("ID not found");
      });
  });
});
