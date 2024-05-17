/**
 * App configuration for local development
 *
 */

var appConfig = {
  envName: "Local",
  apiUrl: "https://dev.riskwolf.com",
  apiUsername: "riskwolf",
  apiPassword: "r!skw0lf",
  azure: {
    msal: {
      auth: {
        clientId: "8ece89af-a2f7-4171-94d3-354ab0d369f7",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "http://localhost:3000",
      },
      apiScopes: ["api://72d2d322-7d16-4e34-96b4-c393b6e9e021/.default"]
    }
  },
  geoapify: {
    api: {
      key: 'f8709219f7f34877ad2e227a02fff081',
    },
  },
};
