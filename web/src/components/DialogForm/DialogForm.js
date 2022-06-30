import React from "react";
import "./DialogForm.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const DialogForm = ({ open, title, children, handleSubmit, handleCancel }) => {
  return (
    <div
      className={classNames({
        "dialog-container": true,
        open,
      })}
    >
      <dialog className="dialog" open={true}>
        <div className="dialog-title">{title}</div>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="Form-content">{children}</div>

          <div className="Action-container">
            <button className="button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

DialogForm.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  formContent: PropTypes.element,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default DialogForm;
