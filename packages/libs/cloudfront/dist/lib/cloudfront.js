"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const constants_1 = require("./constants");
exports.default = ({ credentials }) => {
  const cloudFront = new aws_sdk_1.default.CloudFront({ credentials });
  return {
    createInvalidation: (options) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const timestamp = +new Date() + "";
        const {
          distributionId,
          callerReference = timestamp,
          paths = [constants_1.ALL_FILES_PATH]
        } = options;
        return yield cloudFront
          .createInvalidation({
            DistributionId: distributionId,
            InvalidationBatch: {
              CallerReference: callerReference,
              Paths: {
                Quantity: paths.length,
                Items: paths
              }
            }
          })
          .promise();
      })
  };
};
