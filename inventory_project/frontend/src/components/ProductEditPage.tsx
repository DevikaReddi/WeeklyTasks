// components/ProductEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types';

interface ProductEditPageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductEditPage: React.FC<ProductEditPageProps> = ({
  products,
  setProducts,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the product once on mount
  const original = products.find((p) => p._id.$oid === id);
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    if (original) setFormData(original);
  }, [original]);

  if (!formData) {
    return <div className="no-products">Product not found.</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: name === 'price' || name === 'quantity' ? Number(value) : value } : prev
    );
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id.$oid === formData._id.$oid ? formData : p
      )
    );
    navigate('/'); // back to list
  };

  return (
    <div className="product-edit-container">
      <h2>Edit Product</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          className="input-field"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          className="input-field"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input
          className="input-field"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          className="input-field"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Brand</label>
        <input
          className="input-field"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          className="input-field"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <button className="btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default ProductEditPage;
