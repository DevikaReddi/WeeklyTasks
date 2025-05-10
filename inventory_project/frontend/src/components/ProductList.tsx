// src/components/ProductList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import ProductDisplay from './ProductDisplay';

interface ProductListProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductList: React.FC<ProductListProps> = ({ products, setProducts }) => {
  const navigate = useNavigate();
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    setExpandedProductId(cur => (cur === productId ? null : productId));
  };

  const handleEdit = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleMove = (productId: string, newCategory: string) => {
    setProducts(prev =>
      prev.map(p => (p._id.$oid === productId ? { ...p, category: newCategory } : p))
    );
  };

  // Build unique, non-null categories list
  const categories = Array.from(
    new Set(
      products
        .map(p => p.category)
        .filter((c): c is string => c != null)
    )
  );

  const filteredProducts = categoryFilter
    ? products.filter(p => p.category === categoryFilter)
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
              className={`filter-btn ${
                categoryFilter === category ? 'active' : ''
              }`}
              onClick={() => setCategoryFilter(category)}
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
          {filteredProducts.map(product => {
            const productId = product._id.$oid;
            const isExpanded = expandedProductId === productId;

            return (
              <div
                key={productId}
                className={`product-item ${isExpanded ? 'expanded' : ''}`}
                onClick={() => handleProductClick(productId)}
              >
                <ProductDisplay product={product} />

                {isExpanded && (
                  <div className="product-description">
                    <h4>Description</h4>
                    <p>{product.description || 'No description provided.'}</p>
                    {product.created_at && (
                      <div className="product-date">
                        Added on:{' '}
                        {new Date(product.created_at).toLocaleDateString()}
                      </div>
                    )}

                    {/* Move & Edit Controls */}
                    <div className="move-container">
                      <label htmlFor={`move-${productId}`} className="move-label">
                        Move to:
                      </label>
                      <select
                        id={`move-${productId}`}
                        className="move-select"
                        value={product.category || ''}
                        onClick={e => e.stopPropagation()}
                        onChange={e => {
                          e.stopPropagation();
                          handleMove(productId, e.target.value);
                        }}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>

                      <button
                        className="btn btn-inline"
                        onClick={e => {
                          e.stopPropagation();
                          handleEdit(productId);
                        }}
                      >
                        Edit
                      </button>
                    </div>
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
