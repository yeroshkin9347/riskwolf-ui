var appConfig = {
  envName: "Prod",
  apiUrl: "https://app.riskwolf.com",
  apiUsername: "riskwolf",
  apiPassword: "r!skw0lf",
  azure: {
    msal: {
      auth: {
        clientId: "feeac317-8327-4e8a-aa56-f2ae50427b2e",
        authority: "https://login.microsoftonline.com/6c9023a5-e1f4-4b27-b77f-02f077f131b4",
        redirectUri: "https://app.riskwolf.com",
      },
      apiScopes: ["api://dde74c59-f8e1-48a9-a5be-36d1f1456f82/.default"]
    }
  }
};
