import axios from "axios";
import { getToken } from "../utils/getToken";
import { getToday } from "../utils/helpers";
import { URL } from "../utils/constant";

export async function ReportData({ type, start, end }) {
  const endDate = end || getToday();
  try {
    const data = await axios.get(
      `${URL}api/v1/report?type=${type}&start=${start}&end=${endDate}`,
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return {
      type: data.data.type,
      report: data.data.data,
      count: data.data?.count,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
