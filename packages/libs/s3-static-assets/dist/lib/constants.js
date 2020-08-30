"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PUBLIC_DIR_CACHE_REGEX = exports.DEFAULT_PUBLIC_DIR_CACHE_CONTROL = exports.SERVER_CACHE_CONTROL_HEADER = exports.IMMUTABLE_CACHE_CONTROL_HEADER = void 0;
exports.IMMUTABLE_CACHE_CONTROL_HEADER = "public, max-age=31536000, immutable";
exports.SERVER_CACHE_CONTROL_HEADER =
  "public, max-age=0, s-maxage=2678400, must-revalidate";
exports.DEFAULT_PUBLIC_DIR_CACHE_CONTROL =
  "public, max-age=31536000, must-revalidate";
exports.DEFAULT_PUBLIC_DIR_CACHE_REGEX = /\.(gif|jpe?g|jp2|tiff|png|webp|bmp|svg|ico)$/i;
