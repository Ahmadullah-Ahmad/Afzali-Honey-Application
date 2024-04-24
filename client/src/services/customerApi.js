import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllCustomer({ page, search, borrow }) {
  try {
    const data = await axios.get(
      `${URL}api/v1/customer/?page=${page}&search=${search}&borrower=${borrow}`,
      {
        headers: { Authorization: getToken("jwt") },
      }
    );
    return { data: data.data.customer, count: data.data.count };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
export async function getOneCustomer({ page, id }) {
  try {
    const data = await axios.get(`${URL}api/v1/customer/${id}?page=${page}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return {
      data: data.data.customer,
      sale: data.data.sale,
      purchase: data.data.purchase,
      customerDetails: data.data.customerDetails,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function AddCustomer({ customer }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/save`,
      { ...customer },
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

export async function editCustomerApi({ data }) {
  const { id } = data;
  try {
    const editSales = await axios.patch(
      `${URL}api/v1/customer/${id}`,
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

export async function deleteCustomer(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/customer/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
