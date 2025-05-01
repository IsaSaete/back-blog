import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { huevosRotosBruc159PostData } from "../../postDataFixtures.js";
import app from "../../../server/app.js";
import { AddResponsBody, ResponseBodyError } from "../../types.js";
import Post from "../../model/Post.js";
import { huevosRotosBruc159Post } from "../../fixtures.js";

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

describe("Given the POST /posts endpoint", () => {
  describe("When it receives a resquest with Huevos Rotos: el mejor plato de Bruc, 159 data", () => {
    test("Then it should respond with a 201 status code and  Huevos Rotos: el mejor plato de Bruc, 159 post", async () => {
      const expectedStatus = 201;

      const newPost = huevosRotosBruc159PostData;

      const response = await request(app).post("/posts").send(newPost);

      const body = response.body as AddResponsBody;

      expect(response.status).toBe(expectedStatus);
      expect(body.post).toEqual(
        expect.objectContaining({
          title: "Huevos Rotos: el mejor plato de Bruc, 159",
        }),
      );
    });
  });

  describe("When it receives a resquest with Huevos Rotos: el mejor plato de Bruc, 159 data and this post already exists", () => {
    test("Then it should respon with a 409 and 'Post already exists' error message", async () => {
      const expectedErrorMessage = "Post already exists";
      const expectedStatus = 409;

      await Post.create(huevosRotosBruc159Post);

      const newPost = huevosRotosBruc159PostData;

      const response = await request(app).post("/posts").send(newPost);

      const body = response.body as ResponseBodyError;

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedErrorMessage);
    });
  });
});
