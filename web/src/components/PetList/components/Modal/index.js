import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "../Button";
import close from "./assets/close.svg";
import "./Modal.css";

const Modal = ({ isShowing, hide, children }) => isShowing ? ReactDOM.createPortal(
    <>
        <div className="overlay" />
        <div className="modal-wrapper">
            <div className="modal">
                <div className="modal__header">
                    <Button onClick={hide} className="Delete-button">
                        <img src={close} className="Delete-icon" alt="delete" />
                    </Button>
                </div>
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>
    </>, document.body
) : null;

Modal.propTypes = {
    isShowing: PropTypes.bool,
    hide: PropTypes.bool,
    children: PropTypes.string
};

export default Modal;