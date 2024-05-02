import React, { useState } from 'react';
import apiURL from '../api';

// function for the form
function ItemForm({initialState, onSave}) {
    const [formState, setFormState] = useState(initialState || {
        name: '',
        description: '',
        price: '',
        image: '',
      });

// add your change event so that whatever field is typed into or updated is correctly updated.
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

// add your submit event so that you prevent default browser behavior, send POST request, and clear inputs after submit
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(initialState ? `${apiURL}/items/${initialState.id}` : '/api/items', {
        method: initialState ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      
      onSave(data);
    } catch(error){
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <div className="form-field">
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} />
    <label htmlFor="description">Description:</label>
    <input type="text" id="description" name="description" value={formState.description} onChange={handleChange} />
    <label htmlFor="price">Price:</label>
    <input type="number" id="price" name="price" value={formState.price} onChange={handleChange} />
    <label htmlFor="image">Image URL:</label>
    <input type="text" id="image" name="image" value={formState.image} onChange={handleChange} />
    <input type="submit" className="button-pretty" value={initialState ? "Update" : "Create"} />
  </div>
</form>

  );
}

export default ItemForm;