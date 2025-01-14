import React from 'react';
import '../styles.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;