import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import api from '../../services/api';

async function loginUser(credentials) {
  try {
    const response = await api.post('/user/authenticate', credentials)
    console.log(response.data)
    return response.data;
  } catch (e) {
    console.log("ERROU")
  }
}

async function registerUser(credentials) {
  return fetch('http://localhost:8085/user/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [nome, setNome] = useState()
  const [password, setPassword] = useState();
  const [opcao, setOpcao] = useState('login')

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }

  const handleSubmitRegister = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      nome,
      password
    });
    setToken(token);
  }

  const handleOpcaoClick = (opcaoSelecionada) => {
    setOpcao(opcaoSelecionada);
  };

  return (
    <>
      <div className='logo'></div>
      <div class="menu">
        <div>
          <div className="opcoes">
            <button className={opcao == 'login' ? "selected" : "button-opcoes"} onClick={() => handleOpcaoClick('login')}>Login</button>
            <button className={opcao == 'registrar' ? "selected" : "button-opcoes"} onClick={() => handleOpcaoClick('registrar')}>Registrar-se</button>
         </div>
          {opcao == "login" ? <>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <div class="input-group">
                  <label class="input-label">E-mail</label>
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div class="input-group">
                  <label class="input-label">Senha</label>
                  <input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button class="button-submit-login" type="submit">
                  <span class="span-login">Login</span>
                </button>
              </form>
            </div>
          </> : <>
            <div class="form">
                <form onSubmit={handleSubmitRegister}>
                  <div class="input-group">
                    <label class="input-label-registro">E-mail</label>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div class="input-group">
                    <label class="input-label-registro">Nome</label>
                    <input type="text" onChange={e => setNome(e.target.value)} />
                  </div>
                  <div class="input-group">
                    <label class="input-label-registro">Senha</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                  </div>
                  <button class="button-submit" type="submit">
                    <span class="span-login">Registrar</span>
                  </button>
                </form>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};