import React, { useRef } from 'react';

const VideoItem = ({ video, toggleFavorite, editVideo, deleteVideo }) => {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="video-item" aria-labelledby={`video-${video.id}-title`}>
      <h3 id={`video-${video.id}-title`}>{video.title}</h3>
      <div className="video-container">
        <iframe
          ref={videoRef}
          src={video.url}
          title={video.title}
          aria-label={`Video: ${video.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className="fullscreen-button" onClick={handleFullScreen} aria-label="Pantalla completa">
          🚀
        </button>
      </div>
      <div className="video-actions">
        <button onClick={() => toggleFavorite(video.id)} aria-label={video.favorite ? 'Quitar de favoritos' : 'Marcar como favorito'}>
          {video.favorite ? '❤️' : '🤍'}
        </button>
        <button onClick={() => editVideo(video)} aria-label="Editar video">✏️</button>
        <button onClick={() => deleteVideo(video.id)} aria-label="Eliminar video">🗑️</button>
      </div>
    </div>
  );
};

export default VideoItem;