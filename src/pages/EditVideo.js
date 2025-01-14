import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVideo = ({ videos, editVideo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    title: '',
    url: '',
    category: '',
    description: '',
  });

  // Cargar los datos del video al iniciar
  useEffect(() => {
    const selectedVideo = videos.find((v) => v.id === parseInt(id));
    if (selectedVideo) {
      setVideo(selectedVideo);
    }
  }, [id, videos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo(video);
    navigate('/'); // Redirigir a la página de inicio después de editar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };

  return (
    <div className="video-form">
      <h2>Editar Video</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={video.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          URL:
          <input
            type="url"
            name="url"
            value={video.url}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoría:
          <select
            name="category"
            value={video.category}
            onChange={handleChange}
            required
          >
            <option value="Autos">Autos</option>
            <option value="Deportes">Deportes</option>
            <option value="Animales">Animales</option>
            <option value="Ciudades">Ciudades</option>
            <option value="Varios">Varios</option>
          </select>
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={video.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditVideo;