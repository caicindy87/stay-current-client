const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const getPosts = () => {
  return fetch(`${API_ROOT}/posts`, {
    method: "GET",
    headers: headers,
  }).then((resp) => resp.json());
};

const createNewPost = ({ text, image, selectedTags }, user) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      text: text,
      image: image,
      selected_tags_id: selectedTags,
      user_id: user.id,
    }),
  }).then((resp) => resp.json());
};

const increaseUpvote = (post, user) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      upvotes: post.upvotes + 1,
    }),
  }).then((resp) => resp.json());
};

const decreaseUpvote = (post, user) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      upvotes: post.upvotes - 1,
    }),
  }).then((resp) => resp.json());
};

const increaseDownvote = (post, user) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      downvotes: post.downvotes + 1,
    }),
  }).then((resp) => resp.json());
};

const decreaseDownvote = (post, user) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${post.id}`, {
    method: "PATCH",
    headers: headers,
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
