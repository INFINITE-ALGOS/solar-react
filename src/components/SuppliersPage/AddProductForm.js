// src/components/AddProductForm/AddProductForm.js
import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const AddProductForm = ({ onAddProduct }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!image || !title || !description || !price) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    onAddProduct(formData);
    setImage(null);
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <Button onClick={handleSubmit}>Add Product</Button>
    </div>
  );
};

export default AddProductForm;
