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

describe("200: Testing 'GET' method for '/api/articles/' endpoint", () => {
  test("responds with array of nested objects.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(typeof body.data[1]).toBe("object");
      });
  });
  test("nested objects contains correct properties.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.data[1].author).toBe("string");
        expect(typeof body.data[1].title).toBe("string");
        expect(typeof body.data[1].article_id).toBe("number");
        expect(typeof body.data[1].created_at).toBe("string");
        expect(typeof body.data[1].votes).toBe("number");
        expect(typeof body.data[1].article_img_url).toBe("string");
        expect(typeof body.data[1].comment_count).toBe("string");
      });
  });
});

describe("400: Testing 'GET' method for '/api/articles/' endpoint", () => {
  test("additional Url elements added", () => {
    return request(app)
      .get("/api/articles/additionalUrlElementsAdded")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
  test("return error if query used.", () => {
    return request(app)
      .get("/api/articles?additionalUrl=ElementsAdded")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
