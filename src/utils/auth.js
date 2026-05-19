import { BASE_URL } from "../../../frontend-authorization-demo/src/utils/api";
import { handleServerResponse } from "./api";

const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

// Adding registration API function
export const register = ({ name, email, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      email,
      password,
      avatar,
    }),
  }).then(handleServerResponse);
};

// Adding login (authorize) API function
export const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleServerResponse);
};

// Adding getUserInfo token validity API function
export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
