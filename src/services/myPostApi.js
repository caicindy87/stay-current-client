const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const getMyPosts = (user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then((resp) => resp.json());
};

const editMyPost = (editFormData, user, postId, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${postId}`, {
    method: "PATCH",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    body: editFormData,
  }).then((resp) => resp.json());
};

const deleteMyPost = (user, postId, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${postId}`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
};

export default {
  getMyPosts: getMyPosts,
  editMyPost: editMyPost,
  deleteMyPost: deleteMyPost,
};
