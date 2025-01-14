import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const VideoForm = ({ addVideo }) => {
  const [video, setVideo] = useState({
    title: '',
    category: '',
    url: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo(video); // Llamar a la función addVideo con los datos del video
    navigate('/'); // Redirigir a la página de inicio
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="video-form">
      <label>
        Título del video:
        <input
          type="text"
          name="title"
          placeholder="Título del video"
          value={video.title}
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
          <option value="">Selecciona una categoría</option>
          <option value="Autos">Autos</option>
          <option value="Deportes">Deportes</option>
          <option value="Animales">Animales</option>
          <option value="Ciudades">Ciudades</option>
          <option value="Varios">Varios</option>
        </select>
      </label>
      <label>
        Link del video:
        <input
          type="url"
          name="url"
          placeholder="Link del video"
          value={video.url}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Descripción:
        <textarea
          name="description"
          placeholder="Descripción"
          value={video.description}
          onChange={handleChange}
          required
        />
      </label>
      <div className="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button" onClick={() => setVideo({ title: '', category: '', url: '', description: '' })}>
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default VideoForm;