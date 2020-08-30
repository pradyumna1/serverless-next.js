import AWS from "aws-sdk";
import { Credentials } from "./lib/cloudfront";
export declare type CreateInvalidationOptions = {
  credentials: Credentials;
  distributionId: string;
  paths?: string[];
};
declare const createInvalidation: (
  options: CreateInvalidationOptions
) => Promise<AWS.CloudFront.CreateInvalidationResult>;
export default createInvalidation;
