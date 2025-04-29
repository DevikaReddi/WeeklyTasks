import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { Product } from './types';
import './App.css';

// Create Dummy Data matching your Product interface
// Use placeholder IDs similar to MongoDB ObjectIDs
const dummyProducts: Product[] = [
  { _id: {$oid: "66300a1b1234567890abcdef"}, name: 'Super Laptop', description: 'A very fast laptop indeed. Perfect for developers.', price: 1500.00, brand: 'LapTopCorp', quantity: 10, category: 'Electronics', created_at: '2025-04-28T10:00:00Z' },
  { _id: {$oid: "66300a1b1234567890abcde0"}, name: 'Clicky Keyboard', description: 'Loud mechanical keyboard with RGB.', price: 85.50, brand: 'KeyMasters', quantity: 50, category: 'Accessories', created_at: '2025-04-29T11:30:00Z' },
  { _id: {$oid: "66300a1b1234567890abcde1"}, name: 'Smooth Mouse', description: 'Wireless ergonomic mouse, long battery life.', price: 40.00, brand: 'KeyMasters', quantity: 30, category: 'Accessories', created_at: '2025-04-29T11:35:00Z'},
  { _id: {$oid: "66300a1b1234567890abcde2"}, name: 'Fancy Monitor', price: 450.99, brand: 'ScreenCo', quantity: 5, category: 'Electronics' },
  { _id: {$oid: "66300a1b1234567890abcde3"}, name: '1TB SSD Drive', description: 'Super fast storage solution for all your needs.', price: 120.50, brand: 'StorageMax', quantity: 15, category: 'Storage', created_at: '2025-04-27T14:20:00Z' },
  { _id: {$oid: "66300a1b1234567890abcde4"}, name: 'Wireless Charger', description: 'Charge your devices without the cable mess.', price: 35.99, brand: 'PowerUp', quantity: 20, category: 'Accessories', created_at: '2025-04-26T09:45:00Z' },
];

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ProductList products={dummyProducts} />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2025 Inventory Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default App;