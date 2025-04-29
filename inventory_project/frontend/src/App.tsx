// frontend/src/App.tsx
import React from 'react';
import ProductList from './components/ProductList';
import { Product } from './types'; // Import the Product type
import './App.css'; // Keep default styles for now

// Create Dummy Data matching your Product interface
// Use placeholder IDs similar to MongoDB ObjectIDs
const dummyProducts: Product[] = [
  { _id: {$oid: "66300a1b1234567890abcdef"}, name: 'Super Laptop', description: 'A very fast laptop indeed. Perfect for developers.', price: 1500.00, brand: 'LapTopCorp', quantity: 10, category: 'Electronics', created_at: '2025-04-28T10:00:00Z' },
  { _id: {$oid: "66300a1b1234567890abcde0"}, name: 'Clicky Keyboard', description: 'Loud mechanical keyboard with RGB.', price: 85.50, brand: 'KeyMasters', quantity: 50, category: 'Accessories', created_at: '2025-04-29T11:30:00Z' },
  { _id: {$oid: "66300a1b1234567890abcde1"}, name: 'Smooth Mouse', description: 'Wireless ergonomic mouse, long battery life.', price: 40.00, brand: 'KeyMasters', quantity: 30, category: 'Accessories', created_at: '2025-04-29T11:35:00Z'},
  { _id: {$oid: "66300a1b1234567890abcde2"}, name: 'Fancy Monitor', price: 450.99, brand: 'ScreenCo', quantity: 5 }, // Example with missing description/category/date
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory Management - React Frontend</h1>
      </header>
      <main style={{ padding: '20px' }}>
        {/* Render the ProductList component, passing the dummy data */}
        <ProductList products={dummyProducts} />
      </main>
    </div>
  );
}

export default App;