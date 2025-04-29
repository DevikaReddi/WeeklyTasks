import React from 'react';
import { Product } from '../types';

interface ProductDisplayProps {
  product: Product;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {/* Placeholder image based on product category */}
        <div className="placeholder-img">
          {product.category === 'Electronics' ? '💻' : 
           product.category === 'Accessories' ? '🎧' : '📦'}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          {product.category && <span className="product-category">{product.category}</span>}
        </div>
        <div className="product-details">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-quantity">Stock: {product.quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;