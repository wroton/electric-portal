import axios from "axios";

// Build axios request executor.
const http = axios.create({
  // baseURL: "http://electric-api.azurewebsites.net/api/1/",
  baseURL: "http://localhost:5000/api/1/",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// Handles HTTP response error status codes.
// If the status could not be determined,
// it is treated like a 500.
function handleFailure(error) {
  return Promise.reject(error);
}

// Handles HTTP responses.
function handleSuccess(response) {
  return response;
}

// Setup HTTP interceptors.
http.interceptors.response.use(handleSuccess, handleFailure);

export default http;