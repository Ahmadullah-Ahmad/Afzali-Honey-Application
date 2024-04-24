import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllKeep({ page, search }) {
  try {
    const data = await axios.get(
      `${URL}api/v1/save?page=${page}&search=${search}`,
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return { data: data.data.branchBeeSave, count: data.data.length };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
export async function getOneKeep({ page, id }) {
  try {
    const data = await axios.get(`${URL}api/v1/save/${id}?page=${page}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return { data: data.data.branchBeeSave, count: data.data.length };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function AddKeeps({ keeps }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/save`,
      { ...keeps },
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

export async function editKeepApi({ data }) {
  const { id } = data;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/save/${id}`,
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

export async function deleteSave(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/save/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
