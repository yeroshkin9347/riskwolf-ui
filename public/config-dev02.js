/**
 * App configuration for dev02 environment
 *
 */

var appConfig = {
  envName: "Dev02",
  apiUrl: "https://dev02.riskwolf.com",
  azure: {
    msal: {
      auth: {
        clientId: "c7823c3a-b852-4414-b83f-24933093a654",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "https://dev02.riskwolf.com",
      },
      apiScopes: ["api://7caca8aa-e15d-4de8-8636-17cf24ee436c/.default"]
    }
  },
  geoapify: {
    api: {
      key: 'f8709219f7f34877ad2e227a02fff081',
    },
  },
};
