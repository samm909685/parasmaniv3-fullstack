const API_BASE = (import.meta.env.VITE_API_BASE_URL || "https://api.parasmanijewelers.in/api").replace(/\/+$/, "");
import axios from "axios";

const API = `${API_BASE}/products`;

const getToken = () =>
  localStorage.getItem("parasmani_admin_token");

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ================= GET =================

export const getProducts = async () => {
  const res = await axios.get(API);

  return res.data;
};

// ================= CREATE =================

export const createProduct = async (formData) => {
  const res = await axios.post(API, formData, {
    headers: authHeaders(),
  });

  return res.data;
};

// ================= UPDATE =================

export const updateProduct = async (id, formData) => {
  const res = await axios.put(
    `${API}/${id}`,
    formData,
    {
      headers: authHeaders(),
    }
  );

  return res.data;
};

// ================= DELETE =================

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: authHeaders(),
  });

  return res.data;
};