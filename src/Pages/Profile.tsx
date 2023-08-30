import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser, UserType } from '../services/userAPI';

function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error('Erro ao obter informações do usuário:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Não foi possível carregar as informações do usuário.</p>;
  }

  return (
    <div>
      <h2>Perfil</h2>
      <div>
        <img src={ user.image } alt="Profile" data-testid="profile-image" />
        <p>
          <strong>Nome:</strong>
          {' '}
          {user.name}
        </p>
        <p>
          <strong>Email:</strong>
          {' '}
          {user.email}
        </p>
        <p>
          <strong>Descrição:</strong>
          {' '}
          {user.description}
        </p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    </div>
  );
}

export default Profile;
