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

const editMyPost = (inputs, user, postId) => {
  console.log("user", user);
  console.log("post id in editMyPost", postId);
  return fetch(`${API_ROOT}/users/${user.id}/posts/${postId}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      text: inputs.text,
      image: inputs.image,
      selected_tags_id: inputs.selectedTags,
    }),
  }).then((resp) => resp.json());
};

const deleteMyPost = (user, postId) => {
  console.log("user", user);
  console.log("post id in fetch", postId);
  return fetch(`${API_ROOT}/users/${user.id}/posts/${postId}`, {
    method: "DELETE",
    headers: headers,
  });
};

export default {
  getMyPosts: getMyPosts,
  editMyPost: editMyPost,
  deleteMyPost: deleteMyPost,
};
