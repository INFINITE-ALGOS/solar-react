// src/components/ProductCard/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <Link to={product.learnMoreLink} className="learn-more-button">Learn More</Link>
    </div>
  );
};

export default ProductCard;
