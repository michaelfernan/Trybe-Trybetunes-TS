import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h2>Perfil</h2>
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
  );
}

export default Profile;
