import React from 'react';
import { Product } from '../types'; // Import the Product type

interface ProductDisplayProps {
  product: Product;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    // Basic styling - feel free to improve!
    <div style={{ border: '1px solid #eee', margin: '8px', padding: '8px', borderRadius: '4px' }}>
      <h4>{product.name}</h4>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Quantity: {product.quantity}</p>
      {product.category && <p><small>Category: {product.category}</small></p>}
    </div>
  );
};

export default ProductDisplay;