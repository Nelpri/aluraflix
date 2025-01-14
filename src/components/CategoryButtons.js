import React from 'react';
import '../styles.css';

const CategoryButtons = ({ categories, onCategorySelect }) => {
  return (
    <div className="category-buttons">
      {categories.map((category, index) => (
        <button key={index} onClick={() => onCategorySelect(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;