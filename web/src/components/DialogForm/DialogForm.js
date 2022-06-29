import React from "react";
import "./DialogForm.css";
import PropTypes from "prop-types";

const DialogForm = ({ open, title, children, handleSubmit, handleCancel }) => {
  return (
    <dialog className="Dialog" open={open}>
      <div className="Dialog__Title">{title}</div>
      <form method="dialog" onSubmit={handleSubmit}>
        <div className="Form-content">{children}</div>

        <div className="Action-container">
          <button type="submit">Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </dialog>
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
