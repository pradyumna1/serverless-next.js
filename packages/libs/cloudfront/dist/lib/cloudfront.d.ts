import AWS from "aws-sdk";
declare type CloudFrontClientFactoryOptions = {
  credentials: Credentials;
};
declare type CreateInvalidationOptions = {
  distributionId: string;
  callerReference?: string;
  paths?: string[];
};
export declare type CloudFrontClient = {
  createInvalidation: (
    options: CreateInvalidationOptions
  ) => Promise<AWS.CloudFront.CreateInvalidationResult>;
};
export declare type Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
};
declare const _default: ({
  credentials
}: CloudFrontClientFactoryOptions) => CloudFrontClient;
export default _default;
