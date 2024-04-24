import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllSpends({ page, get, sort }) {
  try {
    const data = await axios.get(
      `${URL}api/v1/spend/?page=${page}&get=${get}&sort=${sort}`,
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return { data: data.data.branchSpend, count: data.data.length };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function AddSpend({ spend }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/spend/`,
      { ...spend },
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

export async function editExpenseApi({ data }) {
  const { id } = data;

  try {
    const editSales = await axios.patch(
      `${URL}api/v1/spend/${id}`,
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

export async function deleteSpend(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/spend/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
