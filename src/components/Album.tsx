import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import LoadingMessage from './LoadingMessage';
import MusicCard from './MusicCard';

type AlbumInfo = {
  artistName: string;
  collectionName: string;
};

type MusicInfo = {
  trackId: number;
  trackName: string;
  previewUrl: string;
};

type SongType = {
  trackId: number;
};

function Album() {
  const { id } = useParams<{ id: string }>();
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo | null>(null);
  const [musicList, setMusicList] = useState<MusicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [favoriteLoading, setFavoriteLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbumInfo() {
      if (id) {
        try {
          const [album, ...songs] = await getMusics(id);
          setAlbumInfo(album);
          setMusicList(songs);
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao obter informações do álbum:', error);
        }
      }
    }

    async function fetchFavoriteSongs() {
      try {
        const favoriteSongsResponse = await getFavoriteSongs();
        setFavoriteSongs(favoriteSongsResponse);
        setFavoriteLoading(false);
      } catch (error) {
        console.error('Erro ao obter músicas favoritas:', error);
      }
    }

    fetchAlbumInfo();
    fetchFavoriteSongs();
  }, [id]);

  if (isLoading || favoriteLoading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h2 data-testid="artist-name">{albumInfo?.artistName}</h2>
      <h1 data-testid="album-name">{albumInfo?.collectionName}</h1>
      <div>
        {musicList.map((music) => {
          const isMusicFavorite = favoriteSongs.some(
            (song) => song.trackId === music.trackId,
          );
          return (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              isFavorite={ isMusicFavorite }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Album;
