import React from "react";
import './Dialog.css';
import PropTypes from 'prop-types';

const Dialog = ({ open, title, message, actions }) => {
    return (
        <dialog className="Dialog" open={open}>
            <div className="Dialog__Title">{title}</div>
            <div className="Dialog__Message">{message}</div>
            <div className="Action-container">{actions.map((a, i) => (<button key={i} onClick={a.onClick}>{a.label}</button>))}</div>
        </dialog>
    );
};

Dialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func
    }))
}

export default Dialog;