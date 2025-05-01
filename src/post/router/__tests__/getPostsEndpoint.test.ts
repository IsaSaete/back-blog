import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Post from "../../model/Post.js";
import { luffyBentoPost, sailorMoonCurryPanPost } from "../../fixtures.js";
import app from "../../../server/app.js";
import { ResponseBody } from "../../types.js";

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

describe("Given the GET /posts enpoint", () => {
  describe("When it receives a resquest", () => {
    test("Then it should respond with a 200 status code and Curry-pan al estilo Sailor Moon 🌙 and Bentō pirata: la receta favorita de Luffy 🏴‍☠️ posts and a total of 2 posts", async () => {
      const expectedStatus = 200;
      const expectedPostsTotal = 2;

      await Post.create(sailorMoonCurryPanPost, luffyBentoPost);

      const response = await request(app).get("/posts");
      const body = response.body as ResponseBody;

      expect(response.status).toBe(expectedStatus);

      expect(body.postsTotal).toBe(expectedPostsTotal);

      expect(body.posts).toContainEqual(
        expect.objectContaining({
          title: "Curry-pan al estilo Sailor Moon 🌙",
        }),
      );

      expect(body.posts).toContainEqual(
        expect.objectContaining({
          title: "Bentō pirata: la receta favorita de Luffy 🏴‍☠️",
        }),
      );
    });
  });
});
