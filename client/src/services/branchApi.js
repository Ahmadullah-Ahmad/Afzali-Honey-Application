import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllBraches({ page }) {
  try {
    const data = await axios.get(`${URL}api/v1/branch?page=${page}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return { data: data.data.doc, count: data.data.count };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function AddBranch({ branch }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/branch`,
      { ...branch },
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

export async function editBranchApi({ data }) {
  const { id } = data;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/branch/${id}`,
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

export async function deleteBranch(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/branch/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function contactBranch({ page }) {
  try {
    const data = await axios.get(`${URL}api/v1/branch/contact?page=${page}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
