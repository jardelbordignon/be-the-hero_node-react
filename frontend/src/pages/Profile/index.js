
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function Profile() {
  const [insidents, setIncidents] = useState([]);

  const history = useHistory();
  const ongId   = localStorage.getItem('ong_id');
  const ongName = localStorage.getItem('ong_name');

  // useEffect recebe função a executar e a condição para que execute 
  useEffect(() => {
    api.get('profile', {
      headers: { Authorization: ongId, }
    }).then(res => {
      setIncidents(res.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId, }
      });

      setIncidents( insidents.filter( i => i.id !== id ));
    } catch (error) {
      alert('Erro ao deletar o caso: '+error);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
   <div className="profile-container">
     
     <header>
       <img src={logoImg} alt="Be the Hero" />
       <span>Bem vinda, {ongName}</span>

       <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
       <button onClick={handleLogout} type="button">
         <FiPower size={18} color="#E02041" />
       </button>
     </header>

     <h1>Casos esperando sua ajuda</h1>

     <ul>
       {insidents.map( insident => (
        <li key={insident.id}>
          <strong>CASO</strong>
          <p>{insident.title}</p>

          <strong></strong>
          <p>{insident.description}</p>

          <strong>VALOR</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(insident.value)}</p>

          <button onClick={() => handleDeleteIncident(insident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
       ) )}
     </ul>
   </div>
  );
}

export default Profile;