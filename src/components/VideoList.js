import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const VideoList = ({ videos, deleteVideo, onVideoSelect }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          <img src={video.image} alt={video.title} />
          <h3>{video.title}</h3>
          <div className="video-actions">
            <Link to={`/edit-video/${video.id}`} className="edit-button">✏️</Link>
            <button onClick={() => deleteVideo(video.id)} className="delete-button">🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;