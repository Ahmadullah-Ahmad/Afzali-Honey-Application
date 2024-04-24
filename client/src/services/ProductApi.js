import axios from "axios";
import { URL } from "../utils/constant";
import { getToken } from "../utils/getToken";

export async function getAllProducts({ page, type, sort }) {
  try {
    const data = await axios.get(
      `${URL}api/v1/product?page=${page}&type=${type}&sort=${sort}`,

      {
        headers: { Authorization: getToken("jwt") },
      },
    );
    return { data: data.data.doc, count: data.data.count };
  } catch (error) {
    return error;
  }
}

export async function getProductCount() {
  try {
    const data = await axios.get(
      `${URL}api/v1/product/complete`,

      {
        headers: { Authorization: getToken("jwt") },
      },
    );
    return { data: data.data.doc, count: data.data.count };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function AddProduct({ product }) {
  try {
    const data = await axios.post(
      `${URL}api/v1/product`,
      { ...product },
      {
        headers: {
          Authorization: getToken("jwt"),
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function editProductApi(data) {
  const { id, buyPrice } = data;
  const purchase = Number(buyPrice);
  data.buyPrice = purchase;
  try {
    const editProduct = await axios.patch(
      `${URL}api/v1/product/${id}`,
      { ...data },
      {
        headers: {
          Authorization: getToken("jwt"),
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return editProduct;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function deleteProduct(id) {
  try {
    const data = await axios.delete(`${URL}api/v1/product/${id}`, {
      headers: { Authorization: getToken("jwt") },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}

export async function getAdvetisments(page) {
  try {
    const data = await axios.get(`${URL}api/v1/advertisment/?page=${page}`);
    return { data: data.data.product, count: data.data.count };
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data.message);
  }
}

export async function getAdvetismentOne(id) {
  try {
    const data = await axios.get(`${URL}api/v1/advertisment/${id}`);
    return { data: data.data.product };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
}
