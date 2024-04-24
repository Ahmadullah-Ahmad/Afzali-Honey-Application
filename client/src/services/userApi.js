import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllUseres({ page }) {
  try {
    const data = await axios.get(`${URL}api/v1/user?page=${page}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return { data: data.data.doc, count: data.data.count };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function AddUser({ user }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/user`,
      { ...user },
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function editUserApi({ data }) {
  const { id } = data;

  try {
    const editSales = await axios.patch(
      `${URL}api/v1/user/${id}`,
      { ...data },
      {
        headers: {
          Authorization: getToken("jwt"),
        },
      }
    );
    return editSales;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function deleteUser(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/user/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
