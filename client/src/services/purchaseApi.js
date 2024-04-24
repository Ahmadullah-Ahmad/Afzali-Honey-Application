import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllPurchase({ page, type, sort }) {
  try {
    const data = await axios.get(
      `${URL}api/v1/purchase?page=${page}&sort=${sort}&type=${type}`,
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return { data: data.data.branchPurchase, count: data.data.length };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function AddPurchase({ purchase }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/purchase`,
      { ...purchase },
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

export async function editPurchaseApi({ data }) {
  const { id } = data;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/purchase/${id}`,
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

export async function deletePurchase(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/purchase/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
