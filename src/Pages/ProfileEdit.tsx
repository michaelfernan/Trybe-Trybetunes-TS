import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser, UserType } from '../services/userAPI';

function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getUser()
      .then((userData) => {
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setDescription(userData.description);
        setImage(userData.image);
      })
      .catch((error) => {
        console.error('Erro ao obter informações do usuário:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isFormValid = () => {
    return name && email && isValidEmail(email) && description;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid() || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      if (user) {
        await updateUser({ name, email, description, image });
        navigate('/profile');
      }
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2 data-testid="edit-profile-title">Editar Perfil</h2>

      <form onSubmit={ handleSubmit }>
        <label>
          Nome:
          <input
            type="text"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            data-testid="edit-input-name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="edit-input-email"
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
            data-testid="edit-input-description"
          />
        </label>
        <label>
          Foto:
          <input
            type="text"
            value={ image }
            onChange={ (e) => setImage(e.target.value) }
            data-testid="edit-input-image"
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ !isFormValid() || isSaving }
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
