const request = require("supertest");
const app = require("./index.js");

describe("GET request to /products", () => {
  test("should respond with a status code of 200 and have an id + price", async () => {
    const result = await request(app).get("/products");
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBe(undefined);
    expect(typeof result.body[0].id).toBe("number");
    expect(typeof result.body[0].default_price).toBe("string");
  });
});

describe("GET request to /products/:productId", () => {
  test("should respond with a status code of 200 and have an id + description", async () => {
    const result = await request(app).get("/products/1");
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBe(undefined);
    expect(typeof result.body.id).toBe("number");
    expect(typeof result.body.default_price).toBe("string");
  });
});

describe("GET request to /products/:productId/styles", () => {
  test("should respond with a status code of 200 and have an id + price + photos", async () => {
    const result = await request(app).get("/products/1/styles");
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBe(undefined);
    expect(typeof result.body.results[0].style_id).toBe("number");
    expect(typeof result.body.results[0].original_price).toBe("string");
    expect(Array.isArray(result.body.results[0].photos)).toBe(true);
  });
});

describe("GET request to /products/:productId/related", () => {
  test("should respond with a status code of 200 and return a related array", async () => {
    const result = await request(app).get("/products/1/related");
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBe(undefined);
    expect(Array.isArray(result.body)).toBe(true);
  });
});
