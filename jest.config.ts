import type { Config } from "jest";
import { createDefaultPreset } from "ts-jest";

const config: Config = {
  verbose: true,
  rootDir: "src",
  resolver: "ts-jest-resolver",
  coverageDirectory: "../coverage",
  collectCoverageFrom: [
    "**/*.ts",
    "!**/*.d.ts",
    "!index.ts",
    "!**/types.ts",
    "!database/connectToDatabase.ts",
    "!server/startServer.ts",
  ],
  ...createDefaultPreset(),
};

export default config;
