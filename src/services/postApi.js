const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const getPosts = (token) => {
  return fetch(`${API_ROOT}/posts`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then((resp) => resp.json());
};

const createNewPost = (formData, user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts`, {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    body: formData,
  }).then((resp) => resp.json());
};

const increaseUpvote = (post, user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      upvotes: post.upvotes + 1,
    }),
  }).then((resp) => resp.json());
};

const decreaseUpvote = (post, user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      upvotes: post.upvotes - 1,
    }),
  }).then((resp) => resp.json());
};

const increaseDownvote = (post, user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      downvotes: post.downvotes + 1,
    }),
  }).then((resp) => resp.json());
};

const decreaseDownvote = (post, user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      downvotes: post.downvotes - 1,
    }),
  }).then((resp) => resp.json());
};

export default {
  getPosts: getPosts,
  createNewPost: createNewPost,
  increaseUpvote: increaseUpvote,
  decreaseUpvote: decreaseUpvote,
  increaseDownvote: increaseDownvote,
  decreaseDownvote: decreaseDownvote,
};
