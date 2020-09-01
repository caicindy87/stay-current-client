const API_ROOT = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};

const editProfile = (data, user, token) => {
  return fetch(`${API_ROOT}/users/${user.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: data,
  });
};

export default {
  editProfile: editProfile,
};
