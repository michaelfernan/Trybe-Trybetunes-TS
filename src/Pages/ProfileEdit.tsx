import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import LoadingMessage from '../components/LoadingMessage';

function ProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser();
        setFormData(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const { name, email } = formData;

    if (name && email && validateEmail(email)) {
      setLoading(true);

      try {
        await updateUser(formData);
        setLoading(false);
        navigate('/profile');
      } catch (error) {
        console.error('Error updating user data:', error);
        setLoading(false);
      }
    } else {
      setFormErrors({
        name: !name,
        email: !validateEmail(email),
      });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (loading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={ formData.name }
            onChange={ handleInputChange }
            data-testid="edit-input-name"
          />
        </label>
        {formErrors.name && <p>Preencha o nome.</p>}

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={ formData.email }
            onChange={ handleInputChange }
            data-testid="edit-input-email"
          />
        </label>
        {formErrors.email && <p>Preencha um email válido.</p>}

        <label>
          Descrição:
          <textarea
            name="description"
            value={ formData.description }
            onChange={ handleInputChange }
            data-testid="edit-input-description"
          />
        </label>

        <label>
          Foto:
          <input
            type="text"
            name="image"
            value={ formData.image }
            onChange={ handleInputChange }
            data-testid="edit-input-image"
          />
        </label>

        <button
          type="button"
          onClick={ handleSave }
          disabled={ loading || !formData.name || !validateEmail(formData.email) }
          data-testid="edit-button-save"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
