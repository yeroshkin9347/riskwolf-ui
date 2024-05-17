/**
 * App configuration for staging env
 *
 */

var appConfig = {
  envName: "Staging",
  apiUrl: "https://staging.riskwolf.com",
  azure: {
    msal: {
      auth: {
        clientId: "ea849098-95d3-44ef-a788-0bfe3934e020",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "https://staging.riskwolf.com",
      },
      apiScopes: ["api://ceda432d-38dd-4586-8f56-e4b3383d8ca9/.default"]
    }
  },
  geoapify: {
    api: {
      key: 'f8709219f7f34877ad2e227a02fff081',
    },
  },
};
