import React, { useState } from 'react';
import './FormStyles.css';
import Carousel from '../Carousel/Carousel'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Login bem-sucedido!');
        setErrorMessage('');
        // Redirecionar ou armazenar token, dependendo da resposta
        localStorage.setItem('username',data.user.user);
        localStorage.setItem('userID',data.user.id);
        localStorage.setItem('email',data.user.email);
        window.location.href = '/dashboard';
        console.log(data);
      } else {
        setErrorMessage('Email ou senha inválidos.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      setErrorMessage('Erro no servidor. Tente novamente mais tarde.');
      setSuccessMessage('');
    }
  };
  
  return (
    <div className="containerForm">
      <div className="left">
        <Carousel />
      </div>
      <div className="right">
        <h2>Entrar</h2>
        <p>Caso você não tenha uma conta, registre-se <a href="/register">aqui</a>!</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Insira seu endereço de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
