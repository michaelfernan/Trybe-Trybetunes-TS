import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

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
        navigate('/search'); // Redirecionamento após o login
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={ name }
            onChange={ handleNameChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          onClick={ handleLogin }
          disabled={ name.length < 3 }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
      {isLoading && <LoadingMessage />}
    </div>
  );
}

export default Login;
