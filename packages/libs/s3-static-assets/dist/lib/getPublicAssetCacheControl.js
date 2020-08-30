"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const regex_parser_1 = __importDefault(require("regex-parser"));
const constants_1 = require("./constants");
const getPublicAssetCacheControl = (filePath, options) => {
  if (options === false) {
    return undefined;
  }
  let value = constants_1.DEFAULT_PUBLIC_DIR_CACHE_CONTROL;
  let test = constants_1.DEFAULT_PUBLIC_DIR_CACHE_REGEX;
  if (typeof options === "object") {
    if (options.value) {
      value = options.value;
    }
    if (options.test) {
      test = regex_parser_1.default(options.test);
    }
  }
  if (test.test(path_1.default.basename(filePath))) {
    return value;
  }
  return undefined;
};
exports.default = getPublicAssetCacheControl;
