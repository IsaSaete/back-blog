import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { huevosRotosBruc159Post } from "../../fixtures.js";
import app from "../../../server/app.js";
import Post from "../../model/Post.js";
import { ResponseBodyError, ResponseBodyPost } from "../../types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the GET/ posts/:postId endpoint", () => {
  describe("When it receives a request with Huevos Rotos: el mejor plato de Bruc, 159 id", () => {
    test("Then it should call the received with a 200 status code and 'Huevos Rotos: el mejor plato de Bruc,159' post", async () => {
      await Post.create(huevosRotosBruc159Post);

      const foundPost = huevosRotosBruc159Post._id;

      const response = await request(app).get(`/posts/${foundPost}`);

      const body = response.body as ResponseBodyPost;

      expect(response.status).toBe(200);
      expect(body.post).toEqual(
        expect.objectContaining({
          title: "Huevos Rotos: el mejor plato de Bruc, 159",
        }),
      );
    });

    describe("When it receives a request with abcd id that isn`t valid", () => {
      test("Then it should call the received with a 400 status code and 'Id not valid' error message", async () => {
        const expectedStatus = 400;
        const expectedMessageError = "Id not valid";

        const invalidId = "abcd";

        const response = await request(app).delete(`/posts/${invalidId}`);

        const body = response.body as ResponseBodyError;

        expect(response.status).toBe(expectedStatus);
        expect(body.error).toBe(expectedMessageError);
      });
    });

    describe("When it receives a reques with abcdef1234567890abcdef1a id that doesn`t exist", () => {
      test("Then it should call the received with 404 status code and 'Post not found' error message", async () => {
        const expectedStatus = 404;
        const expectedMessageError = "Post not found";

        const falseId = "abcdef1234567890abcdef1a ";

        const response = await request(app).delete(`/posts/${falseId}`);

        const body = response.body as ResponseBodyError;

        expect(response.status).toBe(expectedStatus);
        expect(body.error).toBe(expectedMessageError);
      });
    });
  });
});
