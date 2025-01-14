import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoBanner from '../components/VideoBanner';
import '../styles.css';

// Función para extraer el ID de YouTube
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const Home = ({ videos, toggleFavorite, deleteVideo, editVideo }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Categorias');
  const [showCategories, setShowCategories] = useState(false); // Estado para mostrar/ocultar categorías

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleBack = () => {
    setSelectedVideo(null);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories); // Alternar visibilidad de categorías
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategories(false); // Ocultar categorías después de seleccionar una
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Categorias' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Autos', 'Deportes', 'Animales', 'Ciudades', 'Varios'];

  return (
    <div className="home">
      {/* Header */}
      <Header />

      {/* Barra de búsqueda y selector de categorías */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleCategories} className="categories-button">
          {selectedCategory === 'Categorias' ? 'Categorías' : selectedCategory}
        </button>
        {showCategories && (
          <div className="categories-dropdown">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-item"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vista de detalle del video seleccionado */}
      {selectedVideo ? (
        <div className="video-detail">
          <button className="back-button" onClick={handleBack}>🔙</button>
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.url)}`}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        /* Banner de videos */
        <VideoBanner
          videos={filteredVideos}
          onVideoSelect={handleVideoSelect}
          toggleFavorite={toggleFavorite}
          deleteVideo={deleteVideo}
          editVideo={editVideo}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;