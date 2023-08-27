import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from './LoadingMessage';
import { AlbumType } from '../types';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchedArtist, setSearchedArtist] = useState<string>('');

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await searchAlbumsAPI(artistName);
      setSearchedArtist(artistName);
      setAlbums(response);
    } catch (error) {
      console.error('Erro ao pesquisar álbuns:', error);
    } finally {
      setLoading(false);
      setArtistName('');
    }
  };

  return (
    <div>
      <h2>Pesquisar Artista</h2>
      <input
        type="text"
        value={ artistName }
        onChange={ handleArtistNameChange }
        data-testid="search-artist-input"
        placeholder="Digite o nome do artista"
      />
      <button
        type="button"
        onClick={ handleSearch }
        disabled={ artistName.length < 2 }
        data-testid="search-artist-button"
      >
        Pesquisar
      </button>

      {loading && <LoadingMessage />}

      {searchedArtist && (
        <h3>
          Resultado de álbuns de:
          {' '}
          {searchedArtist}
        </h3>
      )}

      {albums.length > 0 ? (
        <ul>
          {albums.map((album) => (
            <li key={ album.collectionId }>
              <a
                href={ `/album/${album.collectionId}` } // Correção aqui
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                {album.collectionName}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum álbum foi encontrado.</p>
      )}
    </div>
  );
}

export default Search;
