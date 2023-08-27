import React, { useState } from 'react';
import checkedHeartImage from '../images/checked_heart.png';
import emptyHeartImage from '../images/empty_heart.png';

interface MusicCardProps {
  trackName: string;
  previewUrl: string;
  trackId: number;
}

function MusicCard({ trackName, previewUrl, trackId }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          checked={ isFavorite }
          onChange={ handleFavoriteToggle }
        />
        <img
          src={ isFavorite ? checkedHeartImage : emptyHeartImage }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
