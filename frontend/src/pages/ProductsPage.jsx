import React from 'react';
import { useProducts } from '../context/ProductsContext';

function ProductsPage() {
  const { getProducts, products } = useProducts();
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product) => {
        <div key={product._id}>
          <h1>{product.name}</h1>
          <p>{product.sku}</p>
          <p>{product.quantity}</p>
          <p>{product.price}</p>
        </div>;
      })}
    </div>
  );
}

export default ProductsPage;
