import axios from 'axios';
import {InteractionRequiredAuthError, PublicClientApplication} from "@azure/msal-browser";
import { msalConfig } from "../Vendor/Azure/authConfig";
import { saveAs } from 'file-saver';

const GetToken = () => {
  const msalInstance = new PublicClientApplication(msalConfig);

  return new Promise((resolve, reject) => {

    const accounts = msalInstance.getAllAccounts();

    const request = {
      scopes: window.appConfig.azure.msal.apiScopes,
      account: accounts[0]
    };

    msalInstance.acquireTokenSilent(request)
      .then(response => {
        resolve(response.accessToken);
      })
      .catch(error => {
        console.log("acquire token error..." + error)
        if (error instanceof InteractionRequiredAuthError) {
          console.log("requiring new token via redirect.")
          // fallback to interaction when silent call fails
          return msalInstance.acquireTokenRedirect(request);
        }
        console.log("rejected token")
        reject(error);
      })
  });

};

class Ajax {
  static downloadFile(URI, token) {
    return new Promise((resolve, reject) => {
      axios({
        url: URI,
        responseType: "blob",
        headers: {'Authorization': `Bearer ${token}`},
      }).then(response => {
        let cdHeader = response
            .headers['content-disposition'];

        let filename;
        if (cdHeader != null) {
          filename = cdHeader
              .split('filename=')[1]
              .split(';')[0]
          filename = filename.substr(1,filename.length -2);
        } else {
          filename = "TPR.pdf";
        }

        saveAs(response.data, filename);
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }

  static getData (URI, token) {
    return new Promise((resolve, reject) => {
      axios({
        url: URI,
        headers: {'Authorization': `Bearer ${token}`},
      })
        .then(response => {
          // handle success
          resolve(response.data);
        })
        .catch(error => {
          // handle error
          reject(error);
        })
    });
  }

  static getDataAll (URIs, token) {
    return new Promise((resolve, reject) => {
      // All requests have same header, just the URLs are different.
      axios.all(
        URIs.map(URI => {
          return axios.get(URI, {
            headers: {'Authorization': `Bearer ${token}`},
          });
        })
      )
        .then(responses => {
          // handle success
          // Get just the data out of the entire response.
          resolve(responses.map(response => {
            return response.data;
          }));
        })
        .catch(error => {
          // handle error
          reject(error);
        })
    });
  }

  static deleteData (URI, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: URI,
        headers: {'Authorization': `Bearer ${token}`},
      })
        .then(response => {
          // handle success
          resolve(response.data);
        })
        .catch(error => {
          // handle error
          reject(error);
        })
    });
  }

  /**
   * Make a POST request
   * @param  {string} URI   Address to the end-point
   * @param  {object} data  Payload
   * @param  {string} token Auth token
   */
  static postData (URI, data, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: URI,
        headers: {'Authorization': `Bearer ${token}`},
        data: data,
      })
        .then(response => {
          // handle success
          resolve(response.data);
        })
        .catch(error => {
          // handle error
          reject(error);
        })
    });
  }

  static putData (URI, data, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: URI,
        headers: {'Authorization': `Bearer ${token}`},
        data: data,
      })
        .then(response => {
          // handle success
          resolve(response.data);
        })
        .catch(error => {
          // handle error
          reject(error);
        })
    });
  }
}

export { Ajax as default, GetToken };
