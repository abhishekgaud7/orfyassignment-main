import axios from "axios";

const API = axios.create({
  baseURL: window.location.hostname === 'localhost' ? "http://localhost:5000/api" : "/api"
});

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const updateProduct = async (id, formData) => {
  const res = await API.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};
