import React, { useState } from 'react';
import '../ModalAdd/ModalForm.css';

const ModalGroup = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGroup = {
      nome: name,
      descricao: description,
      usuario: localStorage.getItem('userID'),
    };

    try {
      const response = await fetch('http://localhost:8080/grupo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGroup),
      });

      if (response.ok) {
        setMessage('Grupo criado com sucesso!');
        setName('');
        setDescription('');
        setTimeout(() => {
          setMessage('');
          onClose(); // Fecha o modal após sucesso
        }, 2000);
      } else {
        setMessage('Erro ao criar o grupo. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Grupo</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <button className="confirm-button" type="submit">
            Salvar
          </button>
        </form>
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalGroup;
