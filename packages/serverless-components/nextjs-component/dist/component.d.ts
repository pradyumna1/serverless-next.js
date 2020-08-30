import { Component } from "@serverless/core";
import {
  OriginRequestDefaultHandlerManifest as BuildManifest,
  OriginRequestDefaultHandlerManifest,
  OriginRequestApiHandlerManifest,
  RoutesManifest
} from "@sls-next/lambda-at-edge/types";
import type { ServerlessComponentInputs } from "../types";
declare type DeploymentResult = {
  appUrl: string;
  bucketName: string;
};
declare class NextjsComponent extends Component {
  default(inputs?: ServerlessComponentInputs): Promise<DeploymentResult>;
  readDefaultBuildManifest(
    nextConfigPath: string
  ): Promise<OriginRequestDefaultHandlerManifest>;
  readRoutesManifest(nextConfigPath: string): Promise<RoutesManifest>;
  pathPattern(pattern: string, routesManifest: RoutesManifest): string;
  validatePathPatterns(
    pathPatterns: string[],
    buildManifest: BuildManifest,
    routesManifest: RoutesManifest
  ): void;
  readApiBuildManifest(
    nextConfigPath: string
  ): Promise<OriginRequestApiHandlerManifest>;
  build(inputs?: ServerlessComponentInputs): Promise<void>;
  deploy(inputs?: ServerlessComponentInputs): Promise<DeploymentResult>;
  remove(): Promise<void>;
}
export default NextjsComponent;
