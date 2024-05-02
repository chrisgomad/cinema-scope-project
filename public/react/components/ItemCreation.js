import React, { useState } from 'react';
import ItemForm from './Form';

const ItemCreation = ({ onCreate }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => setIsCreating(!isCreating);

  return (
    <div>
      <div className='createButton'>
        <button className='button-pretty' onClick={handleCreate}>Create New Item</button>
      </div>
      {isCreating && (
        <div className='createForm'>
          <ItemForm 
            onSave={item => {
              onCreate(item);
              setIsCreating(false);
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default ItemCreation;
