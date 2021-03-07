import axios from "axios";

// Build axios request executor.
const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

// Handles HTTP response error status codes.
// If the status could not be determined,
// it is treated like a 500.
function handleFailure(error) {
  switch (error?.response?.status) {
    case 401:
      document.location = "/login";
      break;
  }

  return Promise.reject(error);
}

// Handles HTTP responses.
function handleSuccess(response) {
  return response;
}

// Setup HTTP interceptors.
http.interceptors.response.use(handleSuccess, handleFailure);

export default http;