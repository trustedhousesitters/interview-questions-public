import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Dialog = ({ open, title, message, actions }) => {
  return (
    <div
      className={classNames({
        "dialog-container": true,
        open,
      })}
    >
      <dialog className="dialog" open={true}>
        <div className="dialog-title">{title}</div>
        <div className="dialog__Message">{message}</div>
        <div className="Action-container">
          {actions.map((a, i) => (
            <button className="button" key={i} onClick={a.onClick}>
              {a.label}
            </button>
          ))}
        </div>
      </dialog>
    </div>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
};

export default Dialog;
