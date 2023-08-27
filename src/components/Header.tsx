import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchUserName() {
      try {
        const user = await getUser();
        setUserName(user.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserName();
  }, []);

  return (
    <header data-testid="header-component">
      <nav>
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">
              Search
            </Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      {loading ? (
        <p data-testid="header-user-name">Carregando...</p>
      ) : (
        <p data-testid="header-user-name">{userName}</p>
      )}
    </header>
  );
}

export default Header;
