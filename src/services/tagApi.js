const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const getTags = () => {
  return fetch(`${API_ROOT}/tags`, {
    method: "GET",
    headers: headers,
  }).then((resp) => resp.json());
};

export default {
  getTags: getTags,
};
