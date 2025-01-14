import React, { useState } from 'react';
import Modal from './Modal';
import VideoForm from './VideoForm';
import '../styles.css';

const VideoBanner = ({ videos, onVideoSelect, toggleFavorite, deleteVideo, editVideo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleSaveChanges = (updatedVideo) => {
    editVideo(updatedVideo);
    setIsModalOpen(false);
  };

  // Función para obtener el thumbnail de un video de YouTube
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  // Función para extraer el ID de un video de YouTube
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="video-banner">
      {videos.map((video) => {
       // const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
          <div key={video.id} className="banner-item">
            {/* Mostrar la imagen del video */}
            <img
              src={getYouTubeThumbnail(video.url)}
              alt={video.title}
              onClick={() => onVideoSelect(video)} // Redirigir al video al hacer clic
              style={{ cursor: 'pointer', width: '100%', borderRadius: '8px' }}
            />
            <h3>{video.title}</h3>
            <div className="video-actions">
              <button
                className={`favorite-button ${video.favorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(video.id)}
              >
                {video.favorite ? '❤️' : '🤍'}
              </button>
              <button
                className="edit-button"
                onClick={() => handleEditClick(video)}
              >
                ✏️
              </button>
              <button
                className="delete-button"
                onClick={() => deleteVideo(video.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal de edición */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VideoForm
          video={selectedVideo}
          onSubmit={handleSaveChanges}
          onClear={() => setSelectedVideo(null)}
        />
      </Modal>
    </div>
  );
};

export default VideoBanner;