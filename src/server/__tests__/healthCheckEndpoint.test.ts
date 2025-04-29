import request from "supertest";
import app from "../app.js";

describe("Given a GET/ endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and 'pong' message", async () => {
      const expectedStatus = 200;
      const expectedMessage = "pong";

      const response = await request(app).get("/");

      const body = response.body as { message: string };

      expect(response.status).toBe(expectedStatus);
      expect(body.message).toBe(expectedMessage);
    });
  });
});
