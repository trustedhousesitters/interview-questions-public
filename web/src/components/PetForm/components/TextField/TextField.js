import React from 'react';

import './TextField.css';

const TextField = ({input, value, handleChange = ()=>{}}) => {
    const {label, field, type, required} = input

    return (
        <div className="TextField-container">
            <label className="TextField-label" htmlFor={field}>{label}</label>
            <input data-testid={`${field}-testID`} className="TextField-input" required={required} type={type} placeholder={label} id={field} name={field} value={value} onChange={handleChange} />
        </div>
    );
};

export default TextField;
