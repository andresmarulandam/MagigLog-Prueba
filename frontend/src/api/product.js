import axios from './axios';

export const createProductRequest = async (product) =>
  axios.post('/products', product);

export const getProductsRequest = async () => axios.get('/products');

export const updateProductRequest = async (product) =>
  axios.put(`/products/${product._id}`, product);

export const deleteProductRequest = async (id) =>
  axios.delete(`/products/${id}`);

export const getProductRequest = async (id) => axios.get(`/products/${id}`);
