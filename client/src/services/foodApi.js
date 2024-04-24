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

export async function AddFood({ food }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/honeyfood`,
      { ...food },
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

export async function editFoodApi({ data }) {
  const { id } = data;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/honeyfood/${id}`,
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

export async function deleteFood(item) {
  const { id, keepId } = item;
  console.log(keepId);
  try {
    const data = await axios.delete(
      `${URL}api/v1/honeyfood/${id}?keepId=${keepId}`,

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
