import request from "supertest";
import app from "../app.js";

describe("Given the GET/fanflins endpoint doesn't exist", () => {
  describe("When it receives a request", () => {
    test("Then it should show a response with a 400 status code and 'Endpoint not found' error", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Endpoint not found";

      const response = await request(app).get("/fanflins");

      const body = response.body as { error: string };

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedMessage);
    });
  });
});
