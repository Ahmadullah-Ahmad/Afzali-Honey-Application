import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllSales({ page, type, sort }) {
  try {
    const data = await axios.get(
      `${URL}api/v1/sales?page=${page}&type=${type}&sort=${sort}`,
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return { data: data.data.branchSales, count: data.data.length };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function AddSells({ sells }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/sales`,
      { ...sells },
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

export async function editSaleApi({ data }) {
  const { id } = data;
  data.id = id;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/sales/${id}`,
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

export async function deleteSales(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/sales/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
