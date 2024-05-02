import React, {useState, useEffect} from 'react';
import apiURL from '../api';
import ItemForm from './Form';


// Alex - added onDelete and onUpdate to the props
const ItemView = ({ itemId, onClose, onDelete, onUpdate }) => {
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(!isEditing);
  
  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`${apiURL}/items/${itemId}`);
      const itemData = await response.json();
      setItem(itemData);
    };

    fetchItem();
  }, [itemId]); 

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-container">
      {/* Always display the item view */}
      <div className='modal'>
        <div className="item-container"> {/* Flex container */}
          <img src={item.image} alt={item.name} className="focused-image" />
          <div className="item-text"> {/* Container for text */}
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
          <div className="button-container">
            <button className='button-pretty' onClick={handleEdit}>Edit</button>
            <button className='button-pretty' onClick={() => onDelete(item.id)}>Delete</button>
            <button className='button-pretty' onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      {/* Conditionally render the edit form below the modal view */}
      {isEditing && (
        <ItemForm initialState={item}
          onSave={item => {
            onUpdate(item);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default ItemView;


