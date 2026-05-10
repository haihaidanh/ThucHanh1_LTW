/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const API_URL = "http://localhost:8081";

function fetchModel(url) {
  return fetch(API_URL + url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    });
}

export default fetchModel;