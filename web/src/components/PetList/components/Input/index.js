import React from "react";

const Input = props => {

	const {
		onChange,
		name,
		placeholder,
		type = 'text'
	} = props;
	
	return (
		<input {...{onChange, name, placeholder, type}} />
	);
};

export default Input;