import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewVideo from './pages/NewVideo';
import EditVideo from './pages/EditVideo';
import './styles.css';

const App = () => {
  // Cargar videos desde localStorage al iniciar
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem('videos');
    return savedVideos ? JSON.parse(savedVideos) : [];
  });

  // Estado para las notificaciones
  const [notification, setNotification] = useState(null);

  // Guardar videos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  // Función para mostrar notificaciones personalizadas
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Ocultar la notificación después de 3 segundos
  };

  // Función para añadir un nuevo video
  const addVideo = (video) => {
    const newVideo = { ...video, id: Date.now(), favorite: false };
    setVideos([...videos, newVideo]);
    showNotification('Video agregado correctamente', 'success');
  };

  // Función para marcar/desmarcar un video como favorito
  const toggleFavorite = (id) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, favorite: !video.favorite } : video
    );
    setVideos(updatedVideos);
    showNotification('Video actualizado', 'info');
  };

  // Función para eliminar un video
  const deleteVideo = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
    showNotification('Video eliminado', 'error');
  };

  // Función para editar un video existente
  const editVideo = (updatedVideo) => {
    const updatedVideos = videos.map((video) =>
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos);
    showNotification('Video editado correctamente', 'success');
  };

  return (
    <Router>
      {/* Notificación personalizada */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <Routes>
        {/* Ruta para la página de inicio */}
        <Route
          path="/"
          element={
            <Home
              videos={videos}
              toggleFavorite={toggleFavorite}
              deleteVideo={deleteVideo}
              editVideo={editVideo}
            />
          }
        />

        {/* Ruta para añadir un nuevo video */}
        <Route path="/new-video" element={<NewVideo addVideo={addVideo} />} />

        {/* Ruta para editar un video existente */}
        <Route
          path="/edit-video/:id"
          element={<EditVideo videos={videos} editVideo={editVideo} />}
        />
      </Routes>
    </Router>
  );
};

export default App;