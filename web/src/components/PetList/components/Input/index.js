import React from "react";
import PropTypes from "prop-types";
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

Input.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
    onChange: PropTypes.string
};

export default Input;