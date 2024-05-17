var appConfig = {
  envName: "Digisafe",
  apiUrl: "https://digisafe.riskwolf.com",
  azure: {
    msal: {
      auth: {
        clientId: "be3d7059-f824-4e49-b3bd-beabb7ca8877",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "https://digisafe.riskwolf.com",
      },
      apiScopes: ["api://428c3194-16a2-4d68-8eb2-3eea54b8cf62/.default"]
    }
  },
  geoapify: {
    api: {
      key: 'f8709219f7f34877ad2e227a02fff081',
    },
  },
};
