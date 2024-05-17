/**
 * Attaches a given access token to a REST call. Returns information parsed data
 * @param accessToken
 * @param url
 */
 export async function callEndpoint(accessToken, url) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers
  };

  return fetch(url, options)
  .then(response => response.json())
  .catch(error => console.log(error));
}
