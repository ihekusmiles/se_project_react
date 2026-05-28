// const baseUrl = "http://192.168.1.164:3001"; baseUrl to test responsive design on phone
const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

// Function to handle server response
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// API call to GET item
export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
};

// API call to POST item with token authorization
export const addItem = ({ name, imageUrl, weather, token }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

// API call to delete item with token authorization
export const removeItem = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

// API call to update user profile with token authorization
export const updateUserProfile = ({ name, avatar, token }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH", // to meet project requirements
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(handleServerResponse);
};

// API call to like an item (adding a like)

// export const addCardLike = ()
