declare const obtainDomains: (
  domains: string | string[] | undefined
) => {
  domain?: string;
  subdomain?: string;
};
export default obtainDomains;
