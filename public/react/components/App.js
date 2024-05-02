import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemsList';
import ItemView from './Items';
import ItemCreation from './ItemCreation';
// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const App = () => {

	const [items, setitems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

	// MichaelH - Scrolls to top of page when item is selected
	const handleItemSelected = (itemId) => {
		setSelectedItem(itemId);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	async function fetchitems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			
			setitems(itemsData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchitems();
	}, []);

	// Alex - Added the below functions to handle adding, deleting, and updating items
	const addItem = item => {
		setitems(prevItems => [...prevItems, item]);
	}

	const deleteItem = async (itemId) => {
		try {
			const response = await fetch(`${apiURL}/items/${itemId}`, {
				method: 'DELETE'
			});
			if (response.status === 204) {
				setitems(items.filter(item => item.id !== itemId));
			}
		} catch (err) {
			console.log("error deleting item! ", err)
		}
	}

	const updateItem = async (item) => {
		try {
			const response = await fetch(`${apiURL}/items/${item.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(item)
			});
			if (response.status === 200) {
				const updatedItem = await response.json();
				setitems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
			}
		} catch (err) {
			console.log("error updating item! ", err)
		}
	}


//Alex - Added onDelete and onUpdate props
	return (
		<main>
			<div className='header'>
		<h1>MACK Store</h1>
			</div> 

			<div>
      			<ItemCreation onCreate={addItem} />
    	</div>

		{selectedItem && (
			<ItemView 
			itemId={selectedItem} 
			onClose={() => setSelectedItem(null)}
			onDelete={deleteItem}     
			onUpdate={updateItem}
			/>
		)}
		<ItemsList items={items} onItemSelected={handleItemSelected} />
		</main>
	);
}