
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './style.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', {id} );
      //console.log(res.data.name)
      localStorage.setItem( 'ong_id', id );
      localStorage.setItem( 'ong_name', res.data.name );
      history.push('/profile');
    } catch (error) {
      alert('Falha no Login: '+error);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero"/>

        <form onSubmit={handleLogin} >
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID"
          value={id}
          onChange={e => setId(e.target.value)} />

          <button className="button" type='submit'>Entrar</button>
          <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="heroes"/>
    </div>
  );
}

export default Logon;