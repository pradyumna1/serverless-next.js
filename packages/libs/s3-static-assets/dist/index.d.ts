import AWS from "aws-sdk";
import { Credentials } from "./lib/s3";
import { PublicDirectoryCache } from "./lib/getPublicAssetCacheControl";
declare type UploadStaticAssetsOptions = {
  bucketName: string;
  basePath: string;
  nextConfigDir: string;
  nextStaticDir?: string;
  credentials: Credentials;
  publicDirectoryCache?: PublicDirectoryCache;
};
declare const uploadStaticAssets: (
  options: UploadStaticAssetsOptions
) => Promise<AWS.S3.ManagedUpload.SendData[]>;
export default uploadStaticAssets;
