import React, { useState } from 'react';
import './FormStyles.css';
import Carousel from '../Carousel/Carousel';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    user: '',
    data_nascimento: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    const formattedDataNascimento = `${formData.data_nascimento}T00:00:00Z`;
  
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: formData.user,
          email: formData.email,
          password: formData.password,
          data_nascimento: formattedDataNascimento,
        }),
      });
  
      // Verifica o status da resposta
      if (response.ok) {
        alert('Usuário registrado com sucesso!');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Erro ao registrar usuário');
      }
  
      // Resetar o formulário
      setFormData({
        email: '',
        user: '',
        data_nascimento: '',
        password: '',
        confirmPassword: '',
      });
      } catch (error) {
        console.error('Erro:', error.message);
        alert(error.message || 'Erro ao registrar o usuário. Por favor, tente novamente.');
      }
    };
  
  return (
    <div className="containerForm">
      <div className="left">
        <Carousel />
      </div>
      <div className="right">
        <h2>Registre-se</h2>
        <p>
          Caso você já possua uma conta, você pode logar clicando <a href="/">aqui</a>!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Informe um endereço de email"
              required
            />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="Entre com um usuário"
              required
            />
          </div>
          <div className="input-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Informe uma senha"
              required
            />
          </div>
          <div className="input-group">
            <label>Confirme a senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme a senha"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
