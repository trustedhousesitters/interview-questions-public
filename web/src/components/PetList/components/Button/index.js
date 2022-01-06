import React from "react";
import classNames from "classnames";
import "./Button.css";

const Button = props => {

	const {
		type = 'button',
		url ='',
		onClick,
		className,
		theme = '',
		children
	} = props;

	const buttonClass = classNames('btn', className, {
		'btn--primary' : theme === 'primary',
		'btn--secondary' : theme === 'secondary'
	});
	
	return (
		<button {...{type, onClick}} className={buttonClass}>{children}</button>
	);
};

export default Button;