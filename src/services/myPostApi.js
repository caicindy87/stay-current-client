const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const getMyPosts = (user) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts`, {
    method: "GET",
    headers: headers,
  }).then((resp) => resp.json());
};

export default {
  getMyPosts: getMyPosts,
};
