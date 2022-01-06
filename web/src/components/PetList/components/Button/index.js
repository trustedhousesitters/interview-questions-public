import React from "react";

const Button = props => {

	const {
		type = 'button',
		onClick,
		children
	} = props;
	
	return (
		<button {...{type, onClick}}>{children}</button>
	);
};

export default Button;