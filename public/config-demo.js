var appConfig = {
  envName: "Demo",
  apiUrl: "https://demo.riskwolf.com",
  apiUsername: "riskwolf",
  apiPassword: "r!skw0lf",
  azure: {
    msal: {
      auth: {
        clientId: "014c16e6-582f-4aa6-bde1-db46b5d8a405",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "https://demo.riskwolf.com",
      },
      apiScopes: ["api://f1fdc582-a116-481e-9be2-57f4e446ce11/.default"]
    }
  },
  geoapify: {
    api: {
      key: 'f8709219f7f34877ad2e227a02fff081',
    },
  },
};
