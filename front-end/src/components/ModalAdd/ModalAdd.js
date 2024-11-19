import React, { useState, useEffect } from 'react';
import './ModalForm.css';
import ModalCategory from './ModalCategorys/ModalCategory';

const ModalForm = ({ isOpen, onClose }) => {
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    valor: '',
    descricao: '',
    data: '',
    categoria: '',
    usuario: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para buscar categorias
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/categoria');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Erro ao carregar categorias');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const openModalCategory = () => {
    setIsModalCategoryOpen(true);
  };

  const closeModalCategory = () => {
    setIsModalCategoryOpen(false);
    fetchCategories(); // Atualiza as categorias após fechar o modal de categorias
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formattedData = {
        ...formData,
        valor: parseFloat(formData.valor),
        data: formData.data ? `${formData.data}T00:00:00Z` : '',
        usuario: localStorage.getItem('userID')
      };
      console.log(formattedData);

      const response = await fetch('http://localhost:8080/transacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setSuccessMessage('Transação adicionada com sucesso!');
        setFormData({ valor: '', descricao: '', data: '', categoria: '' }); // Limpa o formulário
      } else {
        const errorData = await response.json();
        setErrorMessage(`Erro: ${errorData.message || 'Algo deu errado.'}`);
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com o servidor.');
    }
  };

  // Renderiza somente o conteúdo se `isOpen` for verdadeiro
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Adicionar Transação</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Valor:
                <input
                  type="number"
                  name="valor"
                  step="0.01"
                  value={formData.valor}
                  onChange={handleChange}
                  required
                />
              </label>
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
                Data:
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Categoria:
                <input
                  list="categorias"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                />
                <datalist id="categorias">
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {`${category.descricao} - ${category.id}`}
                    </option>
                  ))}
                </datalist>
                <button
                  className="confirm-button-category"
                  type="button"
                  onClick={openModalCategory}
                >
                  Criar nova categoria
                </button>
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
          <ModalCategory isOpen={isModalCategoryOpen} onClose={closeModalCategory} />
        </div>
      )}
    </>
  );
};

export default ModalForm;
