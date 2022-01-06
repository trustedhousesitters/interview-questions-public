import React from "react";

const Input = props => {

	const {
		onChange,
		id,
		name,
		placeholder,
		type = 'text'
	} = props;
	
	return (
		<input {...{onChange, id, name, placeholder, type}} />
	);
};

export default Input;