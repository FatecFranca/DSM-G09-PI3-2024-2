import React from 'react';
import './FormStyles.css';
import Carousel from '../Carousel/Carousel';

const Register = () => {
  return (
    <div className="containerForm">
      <div className="left">
        <Carousel />
      </div>
      <div className="right">
        <h2>Registre-se</h2>
        <p>Caso você já possua uma conta você pode logar clicando <a href="/">aqui</a>!</p>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Informe um endereço de email" required />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Entre com um usuário" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Informe uma senha" required />
          </div>
          <div className="input-group">
            <label>Confirme Password</label>
            <input type="password" placeholder="Confirme a senha" required />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
