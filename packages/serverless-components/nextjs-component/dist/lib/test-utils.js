"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupFixtureDirectory = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
exports.cleanupFixtureDirectory = (fixtureDir) => () => {
  return fs_extra_1.default.remove(
    path_1.default.join(fixtureDir, constants_1.BUILD_DIR)
  );
};
