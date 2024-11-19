// ModalForm.js
import React from 'react';
import '../ModalAdd/ModalForm.css';

const ModalGroupConfig = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar/Remover usuário</h2>
        <form>
          <label>
            Grupo:
            <input type="text" name="name" />
          </label>
          <label>
            Id do usuário:
            <input type="text" name="description" />
          </label>
          <button className="confirm-button" type="submit">Adicionar</button>
        </form>
        <button className="close-button" onClick={onClose}>Remover</button>
      </div>
    </div>
  );
};

export default ModalGroupConfig;
