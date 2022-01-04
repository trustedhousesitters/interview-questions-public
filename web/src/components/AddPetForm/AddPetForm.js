import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Import the addPet reducer from the actionSlice
import { addPet } from '../../PetList/components/actionSlice';

const AddPetForm = () => {
	const [value, setValue] = useState('');
	// Get the dispatch function to dispatch our actions
	const dispatch = useDispatch();

	// Function to submit form data and update the state
	const onSubmit = event => {
		event.preventDefault();

		if (value) {
			dispatch(
				addPet({
					name: value,
				})
			);
		}
	};

	return (

		<form onSubmit={onSubmit} className="form">
			<label className="form__label">Name</label>
			<input
				type="text"
				className="form__input"
				placeholder="Pet name"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>

			<button type="submit" className="btn">Submit</button>
		</form>

	);
};

export default AddPetForm;