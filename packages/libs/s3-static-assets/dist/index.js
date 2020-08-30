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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const readDirectoryFiles_1 = __importDefault(
  require("./lib/readDirectoryFiles")
);
const filterOutDirectories_1 = __importDefault(
  require("./lib/filterOutDirectories")
);
const constants_1 = require("./lib/constants");
const s3_1 = __importDefault(require("./lib/s3"));
const pathToPosix_1 = __importDefault(require("./lib/pathToPosix"));
const getPublicAssetCacheControl_1 = __importDefault(
  require("./lib/getPublicAssetCacheControl")
);
const uploadStaticAssets = (options) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
      bucketName,
      basePath,
      nextConfigDir,
      nextStaticDir = nextConfigDir
    } = options;
    const s3 = yield s3_1.default({
      bucketName,
      credentials: options.credentials
    });
    const dotNextDirectory = path_1.default.join(nextConfigDir, ".next");
    const s3BasePath = basePath ? basePath.slice(1) : "";
    const buildStaticFiles = yield readDirectoryFiles_1.default(
      path_1.default.join(dotNextDirectory, "static")
    );
    const withBasePath = (key) => path_1.default.join(s3BasePath, key);
    const buildStaticFileUploads = buildStaticFiles
      .filter(filterOutDirectories_1.default)
      .map((fileItem) =>
        __awaiter(void 0, void 0, void 0, function* () {
          const s3Key = pathToPosix_1.default(
            withBasePath(
              path_1.default
                .relative(path_1.default.resolve(nextConfigDir), fileItem.path)
                .replace(/^.next/, "_next")
            )
          );
          return s3.uploadFile({
            s3Key,
            filePath: fileItem.path,
            cacheControl: constants_1.IMMUTABLE_CACHE_CONTROL_HEADER
          });
        })
      );
    const pagesManifest = yield fs_extra_1.default.readJSON(
      path_1.default.join(dotNextDirectory, "serverless/pages-manifest.json")
    );
    const htmlPageUploads = Object.values(pagesManifest)
      .filter((pageFile) => pageFile.endsWith(".html"))
      .map((relativePageFilePath) => {
        const pageFilePath = path_1.default.join(
          dotNextDirectory,
          `serverless/${relativePageFilePath}`
        );
        return s3.uploadFile({
          s3Key: pathToPosix_1.default(
            withBasePath(
              `static-pages/${relativePageFilePath.replace(/^pages\//, "")}`
            )
          ),
          filePath: pageFilePath,
          cacheControl: constants_1.SERVER_CACHE_CONTROL_HEADER
        });
      });
    const prerenderManifest = yield fs_extra_1.default.readJSON(
      path_1.default.join(dotNextDirectory, "prerender-manifest.json")
    );
    const prerenderManifestJSONPropFileUploads = Object.keys(
      prerenderManifest.routes
    ).map((key) => {
      const pageFilePath = pathToPosix_1.default(
        path_1.default.join(
          dotNextDirectory,
          `serverless/pages/${
            key.endsWith("/") ? key + "index.json" : key + ".json"
          }`
        )
      );
      return s3.uploadFile({
        s3Key: pathToPosix_1.default(
          withBasePath(prerenderManifest.routes[key].dataRoute.slice(1))
        ),
        filePath: pageFilePath
      });
    });
    const prerenderManifestHTMLPageUploads = Object.keys(
      prerenderManifest.routes
    ).map((key) => {
      const relativePageFilePath = key.endsWith("/")
        ? path_1.default.posix.join(key, "index.html")
        : key + ".html";
      const pageFilePath = pathToPosix_1.default(
        path_1.default.join(
          dotNextDirectory,
          `serverless/pages/${relativePageFilePath}`
        )
      );
      return s3.uploadFile({
        s3Key: pathToPosix_1.default(
          withBasePath(
            path_1.default.posix.join("static-pages", relativePageFilePath)
          )
        ),
        filePath: pageFilePath,
        cacheControl: constants_1.SERVER_CACHE_CONTROL_HEADER
      });
    });
    const fallbackHTMLPageUploads = Object.values(
      prerenderManifest.dynamicRoutes || {}
    )
      .filter(({ fallback }) => {
        return !!fallback;
      })
      .map((routeConfig) => {
        const fallback = routeConfig.fallback;
        const pageFilePath = pathToPosix_1.default(
          path_1.default.join(dotNextDirectory, `serverless/pages/${fallback}`)
        );
        return s3.uploadFile({
          s3Key: pathToPosix_1.default(
            withBasePath(path_1.default.posix.join("static-pages", fallback))
          ),
          filePath: pageFilePath,
          cacheControl: constants_1.SERVER_CACHE_CONTROL_HEADER
        });
      });
    const uploadPublicOrStaticDirectory = (directory, publicDirectoryCache) =>
      __awaiter(void 0, void 0, void 0, function* () {
        const directoryPath = path_1.default.join(nextStaticDir, directory);
        if (!(yield fs_extra_1.default.pathExists(directoryPath))) {
          return Promise.resolve([]);
        }
        const files = yield readDirectoryFiles_1.default(directoryPath);
        return files.filter(filterOutDirectories_1.default).map((fileItem) =>
          s3.uploadFile({
            filePath: fileItem.path,
            s3Key: pathToPosix_1.default(
              withBasePath(
                path_1.default.relative(
                  path_1.default.resolve(nextStaticDir),
                  fileItem.path
                )
              )
            ),
            cacheControl: getPublicAssetCacheControl_1.default(
              fileItem.path,
              publicDirectoryCache
            )
          })
        );
      });
    const publicDirUploads = yield uploadPublicOrStaticDirectory(
      "public",
      options.publicDirectoryCache
    );
    const staticDirUploads = yield uploadPublicOrStaticDirectory(
      "static",
      options.publicDirectoryCache
    );
    const allUploads = [
      ...buildStaticFileUploads,
      ...htmlPageUploads,
      ...prerenderManifestJSONPropFileUploads,
      ...prerenderManifestHTMLPageUploads,
      ...fallbackHTMLPageUploads,
      ...publicDirUploads,
      ...staticDirUploads
    ];
    return Promise.all(allUploads);
  });
exports.default = uploadStaticAssets;
