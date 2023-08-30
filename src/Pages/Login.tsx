import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLogin = async () => {
    if (name.length >= 3) {
      setIsLoading(true);

      try {
        await createUser({ name });
        setIsLoading(false);
        navigate('/search');
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <label className="login-label">
          Nome:
          <input
            className="login-input"
            type="text"
            value={ name }
            onChange={ handleNameChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          className="login-button"
          type="button"
          onClick={ handleLogin }
          disabled={ name.length < 3 }
          data-testid="login-submit-button"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {isLoading && <LoadingMessage />}
    </div>
  );
}

export default Login;
