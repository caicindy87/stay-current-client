const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
  // Authorization: token,
};

const login = (username, password) => {
  return fetch(`${API_ROOT}/auth`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username: username, password: password }),
  }).then((resp) => resp.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    method: "GET",
    headers: headers,
  }).then((resp) => resp.json());
};

const signup = ({ email, username, password, passwordConfirm }) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      user: {
        email,
        username,
        password,
        passwordConfirm,
      },
    }),
  }).then((resp) => resp.json());
};

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser,
    signup: signup,
  },
};
