import http from "../services/http";

// Key user to get the user.
const userKey = "electric-user";

// Get the user from local storage. May be null.
let user = localStorage.getItem(userKey);

// Gets the current user.
export function getUser() {
  return user;
}

// Logs the user in.
export async function login(emailAddress, password) {
  // Login. If it fails, clear the user and return the message.
  let response = await http.post("token", { emailAddress, password });
  if (!response.data || response.status !== 200) {
    return response;
  }

  // If the response succeeds, set the user in local storage and in the service.
  localStorage.setItem(userKey, response.data);
  user = response.data;

  // Login succeeded.
  return response;
}

// Logs the user out.
export async function logout() {
  localStorage.removeItem(userKey);
  user = undefined;
}