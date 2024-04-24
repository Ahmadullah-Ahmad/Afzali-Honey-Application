import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

function setTokenInLocalStorage(token) {
  localStorage.setItem("jwt", token);
}

export async function login({ username, password }) {
  try {
    const data = await axios.post(`${URL}api/v1/user/login`, {
      username,
      password,
    });
    const token = data.data?.token;
    if (!token) {
      throw new Error("Please, enter correct username and password");
    }
    setTokenInLocalStorage(token);
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getCurrentUser() {
  try {
    const user = await axios.get(`${URL}api/v1/user/me`, {
      headers: { Authorization: getToken("jwt") },
    });

    return user.data.doc;
  } catch (error) {
    return null;
  }
}

export async function editMeApi({ data }) {
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/user/updateMe`,
      { ...data },
      {
        headers: {
          Authorization: getToken("jwt"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return editSales;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function editPasswordApi({ data }) {
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/user/updatePassword`,
      { ...data },
      {
        headers: {
          Authorization: getToken("jwt"),
        },
      }
    );
    return editSales;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
