import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = ({
  testId = 'modal',
  visible,
  containerId = 'modal',
  className = '',
  hideModal,
  showCancel = true,
  showConfirm = true,
  children,
}) => visible && ReactDOM.createPortal((
  <div
    data-testid={testId}
    className="c-modal"
  >
    <div
      data-testid={`${testId}_screen`}
      className="c-modal__screen"
      onClick={hideModal}
    />
    <div className={`c-modal__body ${className}`}>
      {children(
        <div className="c-modal__footer">
          {showCancel && (
            <button
              data-testid={`${testId}_cancel`}
              type="button"
              className="c-modal__cancel"
              onClick={hideModal}
            >
              Cancel
            </button>
          )}
          {showConfirm && (
            <button
              data-testid={`${testId}_confirm`}
              type="submit"
            >
              Confirm
            </button>
          )}
        </div>
      )}
    </div>
  </div>
), document.getElementById(containerId));

export default Modal;
