import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
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

	const isAnchor = url && (url.includes('http') || url.startsWith('#') || url.startsWith('mailto') || url.startsWith('/'));

	const renderAsLink = () =>
		<a href={ url } role="button" className={buttonClass}>{ children }</a>

	const renderAsButton = () =>
		<button {...{type, onClick}} className={buttonClass}>{children}</button>
	
	return (
		isAnchor ? renderAsLink() : renderAsButton()
	);
};

Button.propTypes = {
    type: PropTypes.string,
    url: PropTypes.string,
    className: PropTypes.string,
    theme: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.string
};

export default Button;