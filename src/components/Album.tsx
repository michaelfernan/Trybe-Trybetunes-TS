import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import LoadingMessage from './LoadingMessage';
import MusicCard from './MusicCard';

interface AlbumInfo {
  artistName: string;
  collectionName: string;
}

interface MusicInfo {
  trackId: number;
  trackName: string;
  previewUrl: string;
}

function Album() {
  const { id } = useParams<{ id: string }>();
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo | null>(null);
  const [musicList, setMusicList] = useState<MusicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    fetchAlbumInfo();
  }, [id]);

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h2 data-testid="artist-name">{albumInfo?.artistName}</h2>
      <h1 data-testid="album-name">{albumInfo?.collectionName}</h1>
      <div>
        {musicList.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />
        ))}
      </div>
    </div>
  );
}

export default Album;
