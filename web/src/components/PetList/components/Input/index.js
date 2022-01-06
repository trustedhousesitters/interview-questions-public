import React from "react";
import "./Input.css";

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