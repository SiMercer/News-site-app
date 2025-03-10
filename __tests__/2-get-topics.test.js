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

describe("Testing 'GET' method for '/api/topics' endpoint", () => {
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
