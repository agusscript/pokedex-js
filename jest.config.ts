import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  verbose: true,
  rootDir: "src",
  collectCoverage: true,
  coverageDirectory: "../coverage/",
  testPathIgnorePatterns: ["/node_modules/", ".*fixture.js"],
  coveragePathIgnorePatterns: ["/node_modules/", ".*fixture.js"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
};

export default config;
