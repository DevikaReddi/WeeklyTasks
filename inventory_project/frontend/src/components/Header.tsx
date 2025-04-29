import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <h1>Inventory Manager</h1>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/products" className="nav-link active">Products</a></li>
            <li><a href="/categories" className="nav-link">Categories</a></li>
            <li><a href="/reports" className="nav-link">Reports</a></li>
          </ul>
        </nav>
        
        <div className="user-actions">
          <button className="btn btn-outline">
            <span className="icon">🔍</span>
          </button>
          <button className="btn btn-outline">
            <span className="icon">🔔</span>
            <span className="badge">2</span>
          </button>
          <button className="btn">Admin</button>
        </div>
      </div>
    </header>
  );
};

export default Header;