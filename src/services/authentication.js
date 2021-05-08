import http from "../services/http";

// Key user to get the user.
const userKey = "electric-user";

// Get the user from local storage. May be null.
let user = localStorage.getItem(userKey);

if (user) {
  try {
    user = JSON.parse(user);
  } catch {
    user = undefined;
  }
}

// Callback to use when the user changes.
let userChanged = () => { };

// Gets the current user.
export function getUser() {
  // Check the expiry.
  let today = new Date();
  if (!user?.expiry || user.expiry < today.valueOf()) {
    user = undefined;
    localStorage.removeItem(userKey);
  }

  userChanged(user);
  return user;
}

// Designates a callback to use when the user changes.
export function hookUser(c) {
  if (c === undefined || c === null) {
    userChanged = () => { };
    return;
  }

  userChanged = c;
}

// Logs the user in.
export async function login(emailAddress, password) {
  // Login. If it fails, clear the user and return the message.
  let response = await http.post("token", { emailAddress, password });
  if (!response.data || response.status !== 200) {
    user = undefined;
    return response;
  }

  // Get the user. If it fails, clear the user and return the message.
  response = await http.get("token");
  if (!response?.data || response?.status !== 200) {
    user = undefined;
    return response;
  }

  // Put an expiry on the user so a new token can be retrieved.
  // Tokens last 24 hours.
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  user = {
    ...response.data,
    expiry: tomorrow.valueOf()
  };

  // If the response succeeds, set the user in local storage and in the service.
  localStorage.setItem(userKey, JSON.stringify(user));

  // Login succeeded.
  return response;
}

// Logs the user out.
export async function logout() {
  localStorage.removeItem(userKey);
  user = undefined;
}