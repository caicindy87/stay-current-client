const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const getMyPosts = (user, token) => {
  console.log("fetching", user);
  return fetch(`${API_ROOT}/users/${user.id}/posts`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then((resp) => resp.json());
};

const editMyPost = (inputs, user, postId, token) => {
  return fetch(`${API_ROOT}/users/${user.id}/posts/${postId}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      text: inputs.text,
      image: inputs.image,
      selected_tags_id: inputs.selectedTags,
    }),
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
