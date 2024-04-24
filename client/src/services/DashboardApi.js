import axios from "axios";
import { getToken } from "../utils/getToken";
import { URL } from "../utils/constant";

export async function dashboardData({ queryDate }) {
  try {
    const data = await axios.get(`${URL}api/v1/dashboard/?start=${queryDate}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return {
      product: data.data.product,
      sales: data.data.sales,
      purchase: data.data.purchase,
      boxes: data.data.boxes,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
