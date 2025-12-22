const baseUrl = "http://localhost:3001";
const headers = {
  "Content-type": "application/json",
};

// Function to handle server response
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// API call to GET item
export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
};

// API call to POST item
export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

// API call to delete item
export const removeItem = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};
