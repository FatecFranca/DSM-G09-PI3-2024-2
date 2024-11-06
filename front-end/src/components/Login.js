import React from 'react';
import './FormStyles.css';
import Carousel from './Carousel'; 

const Login = () => {
  return (
    <div className="container">
      <div className="left">
        <Carousel />
      </div>
      <div className="right">
        <h2>Entrar</h2>
        <p>Caso você não tenha uma conta registre-se <a href="/register">aqui</a>!</p>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Insira seu endereço de email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Insira sua senha" required />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
