import React, { useState } from 'react';
import checkedHeartImage from '../images/checked_heart.png';
import emptyHeartImage from '../images/empty_heart.png';

type MusicCardProps = {
  trackName: string;
  previewUrl: string;
  trackId: number;
  isFavorite: boolean;

};
function MusicCard({ trackName, previewUrl, trackId, isFavorite }: MusicCardProps) {
  const [isChecked, setIsChecked] = useState(isFavorite);

  const handleFavoriteToggle = () => {
    setIsChecked(!isChecked);
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
          checked={ isChecked }
          onChange={ handleFavoriteToggle }
        />
        <img
          src={ isChecked ? checkedHeartImage : emptyHeartImage }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
