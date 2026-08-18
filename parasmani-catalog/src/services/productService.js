import axios from "axios";

const API = "https://api.parasmanijewellers.in/api/products";
export const getProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateProduct = async (id, formData) => {
  const res = await axios.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};