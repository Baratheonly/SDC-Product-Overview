import supertest from "supertest";
import app from "./index.js";

describe("first test", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
  });
});
