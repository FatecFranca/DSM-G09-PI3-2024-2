import React, { useState } from 'react';
import '../ModalAdd/ModalForm.css';

const ModalGroupConfig = ({ isOpen, onClose }) => {
  const [groupId, setGroupId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const payload = {
      grupo_id: groupId,
      usuario_id: userId,
    };

    try {
      const response = await fetch(`http://localhost:8080/grupo/${groupId}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showMessage('Usuário adicionado com sucesso!');
        setGroupId('');
        setUserId('');
      } else {
        showMessage('Erro ao adicionar o usuário. Verifique os IDs.', true);
      }
    } catch (error) {
      showMessage('Erro ao conectar ao servidor.', true);
    }
  };

  const handleRemoveUser = async () => {
    const payload = {
      grupo_id: groupId,
      usuario_id: userId,
    };

    try {
      const response = await fetch(`http://localhost:8080/grupo/${groupId}/usuarios`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showMessage('Usuário removido com sucesso!');
        setGroupId('');
        setUserId('');
      } else {
        showMessage('Erro ao remover o usuário. Verifique os IDs.', true);
      }
    } catch (error) {
      showMessage('Erro ao conectar ao servidor.', true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar/Remover usuário</h2>
        {message && (
          <p className={`message ${message.isError ? 'error' : ''}`}>{message.text}</p>
        )}
        <form onSubmit={handleAddUser}>
          <label>
            Id do Grupo:
            <input
              type="text"
              name="groupId"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              required
            />
          </label>
          <label>
            Id do Usuário:
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <button className="confirm-button" type="submit">
            Adicionar
          </button>
        </form>
        <button className="close-button" onClick={handleRemoveUser}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default ModalGroupConfig;
