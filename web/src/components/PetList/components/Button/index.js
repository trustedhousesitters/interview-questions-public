import React from "react";

const Button = props => {

	const {
		type = 'button',
		onClick,
		className = 'btn',
		children
	} = props;
	
	return (
		<button {...{type, onClick, className}}>{children}</button>
	);
};

export default Button;