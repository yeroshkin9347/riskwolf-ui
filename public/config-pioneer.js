var appConfig = {
  envName: "Pioneer",
  apiUrl: "https://pioneer.riskwolf.com",
  azure: {
    msal: {
      auth: {
        clientId: "68c7e9d0-592d-4b08-9bfd-ce2378fd1516",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "https://pioneer.riskwolf.com",
      },
      apiScopes: ["api://e926b13f-2b92-43a5-93c4-743bfaed9126/.default"]
    }
  },
  geoapify: {
    api: {
      key: 'f8709219f7f34877ad2e227a02fff081',
    },
  },
};
