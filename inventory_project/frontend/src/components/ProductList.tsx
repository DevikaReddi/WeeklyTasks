import React, { useState } from 'react';
import { Product } from '../types'; // Import the type
import ProductDisplay from './ProductDisplay';

interface ProductListProps {
  products: Product[]; // Expects an array of Product objects
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // State to keep track of the ID of the expanded product
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  // Function to handle clicking on a product item
  const handleProductClick = (productId: string) => {
    // If the clicked product is already expanded, collapse it (set state to null)
    // Otherwise, expand the clicked product (set state to its ID)
    setExpandedProductId(currentId => (currentId === productId ? null : productId));
  };

  return (
    <div>
      <h3>Product List (Click Item to See Description)</h3>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => {
          const productId = product._id.$oid; // Extract the string ID
          return (
            // Use the product ID as the key for React's list rendering
            <div key={productId} onClick={() => handleProductClick(productId)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
              <ProductDisplay product={product} />
              {/* Conditionally render the description if this product is expanded */}
              {expandedProductId === productId && (
                <div style={{ padding: '0 15px 10px 15px', margin: '0 8px', backgroundColor: '#f9f9f9' }}>
                  <strong>Description:</strong>
                  <p>{product.description || 'No description provided.'}</p>
                   {/* Optionally show other details like created_at/updated_at here */}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductList;