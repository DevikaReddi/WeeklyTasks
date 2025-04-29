import React, { useState } from 'react';
import { Product } from '../types';
import ProductDisplay from './ProductDisplay';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // State to keep track of the ID of the expanded product
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  
  // New state for filtering products by category
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Function to handle clicking on a product item
  const handleProductClick = (productId: string) => {
    setExpandedProductId(currentId => (currentId === productId ? null : productId));
  };

  // Get all unique categories from products
  const categories = Array.from(
    new Set(products.map(product => product.category).filter(Boolean))
  );

  // Filter products by category if a filter is selected
  const filteredProducts = categoryFilter
    ? products.filter(product => product.category === categoryFilter)
    : products;

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Product Inventory</h2>
        <div className="product-filters">
          <button 
            className={`filter-btn ${categoryFilter === null ? 'active' : ''}`}
            onClick={() => setCategoryFilter(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${categoryFilter === category ? 'active' : ''}`}
              onClick={() => setCategoryFilter(category as string)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">No products available.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const productId = product._id.$oid;
            return (
              <div 
                key={productId} 
                className={`product-item ${expandedProductId === productId ? 'expanded' : ''}`}
                onClick={() => handleProductClick(productId)}
              >
                <ProductDisplay product={product} />
                
                {expandedProductId === productId && (
                  <div className="product-description">
                    <h4>Description</h4>
                    <p>{product.description || 'No description provided.'}</p>
                    {product.created_at && (
                      <div className="product-date">
                        Added on: {new Date(product.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;