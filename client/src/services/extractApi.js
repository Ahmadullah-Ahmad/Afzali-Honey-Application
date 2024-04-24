import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllFood({ page }) {
  try {
    const data = await axios.get(`${URL}api/v1/honeyfood?page=${page}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return { data: data.data.FoodHoney, count: data.data.length };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function AddExtract({ honey }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/extracthoney`,
      { ...honey },
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

export async function editExtractApi({ data }) {
  const { id } = data;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/extracthoney/${id}`,
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

export async function deleteExtract(id) {
  console.log(id);

  try {
    const data = await axios.delete(
      `${URL}api/v1/extracthoney/${id}`,

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
