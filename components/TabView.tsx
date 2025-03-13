
// TabView component for switching product categories
import React, { useState } from 'react';

interface TabViewProps {
  categories: string[];
  products: {
    id: number;
    title: string;
    price: number;
    note: string;
    category: string;
    photo: string;
    qty: string,
    barcode: number;
  }[];
}

export const TabView: React.FC<TabViewProps> = ({ categories, products }) => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredProducts = products.filter(
    product => product.category === activeTab
  );

  return (
    <div className="tab-view">
      <div className="tab-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`tab-button ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.photo} alt={product.title} /> 
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};