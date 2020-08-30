export declare type PublicDirectoryCache =
  | boolean
  | {
      test?: string;
      value?: string;
    };
declare const getPublicAssetCacheControl: (
  filePath: string,
  options?:
    | boolean
    | {
        test?: string | undefined;
        value?: string | undefined;
      }
    | undefined
) => string | undefined;
export default getPublicAssetCacheControl;
