const baseUrl = "http://localhost:3001";

const headers = {
  "Content-type": "application/json",
};

// function to handle server response
const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// api call to GET items
export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
};

// api call to POST items
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

export const removeItem = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};
