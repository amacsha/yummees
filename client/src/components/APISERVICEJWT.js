const BASEURL = import.meta.env.VITE_BASEURL;
import axios from "axios";

const apiServiceJWT = {
  register: (user) => {
    return fetch(`${BASEURL}/register`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  login: (user) => {
    return axios
      .post(`${BASEURL}/login`, user, { withCredentials: false })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },

  profile: (accessToken) => {
    return axios
      .get(`${BASEURL}/me`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },

  logout: (tokenName) => {
    const token = localStorage.getItem(tokenName);

    localStorage.removeItem(tokenName);

    return axios
      .post(
        `${BASEURL}/logout`,
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
};

export default apiServiceJWT;
