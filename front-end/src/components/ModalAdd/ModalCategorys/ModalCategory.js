import React, { useState } from 'react';
import '../ModalForm.css';

const ModalCategory = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    descricao: '',
    ativo: true,
    tipo_transacao: 'Pix',
    usuario: localStorage.getItem('userID')
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'ativo' ? value === 'true' : value, // Converte ativo para boolean
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8080/categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Categoria adicionada com sucesso!');
        setFormData({ descricao: '', ativo: true, tipo_transacao: 'Pix' }); // Limpa o formulário
      } else {
        const errorData = await response.json();
        setErrorMessage(`Erro: ${errorData.message || 'Algo deu errado.'}`);
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Categoria</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Descrição:
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ativo:
            <select name="ativo" value={formData.ativo} onChange={handleChange}>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </label>
          <label>
            Transação:
            <input
              list="transacoes"
              name="tipo_transacao"
              value={formData.tipo_transacao}
              onChange={handleChange}
              required
            />
            <datalist id="transacoes">
              <option value="Pix"></option>
              <option value="Débito"></option>
              <option value="Crédito"></option>
              <option value="Cédulas"></option>
            </datalist>
          </label>
          <button className="confirm-button" type="submit">
            Salvar
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalCategory;
