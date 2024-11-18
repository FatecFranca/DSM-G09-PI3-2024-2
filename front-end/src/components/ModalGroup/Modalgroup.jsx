// ModalForm.js
import React from 'react';
import '../ModalAdd/ModalForm.css';

const ModalGroup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Grupo</h2>
        <form>
          <label>
            Nome:
            <input type="text" name="name" />
          </label>
          <label>
            Descrição:
            <input type="text" name="description" />
          </label>
          <button className="confirm-button" type="submit">Salvar</button>
        </form>
        <button className="close-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalGroup;
