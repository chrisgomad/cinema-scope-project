import React from 'react';

export const ItemsList = ({items, onItemSelected}) => {
  return (
    <div className="cards-container">
      {items.map(item => (
        <div key={item.id} className="card" onClick={() => onItemSelected(item.id)}>
          <img 
            src={item.image} 
            alt={item.name}
            className="card-image"
          />
          <h1 class="card-title">{item.name}</h1>
        </div>
      ))}
    </div>
  );
}
