import { createContext, useContext, useState } from 'react';
import {
  createProductRequest,
  getProductRequest,
  getProductsRequest,
  updateProductRequest,
  deleteProductRequest,
} from '../api/product';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('error');
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, SetProducts] = useState([]);

  const createProduct = async (product) => {
    const res = await createProductRequest(product);
  };

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      SetProducts(res.data);
    } catch (error) {}
  };

  return (
    <ProductContext.Provider value={{ products, createProduct, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
