import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoForm from '../components/VideoForm';
import '../styles.css';

const NewVideo = ({ addVideo }) => {
  return (
    <div className="new-video">
      <Header />
      <VideoForm addVideo={addVideo} />
      <Footer />
    </div>
  );
};

export default NewVideo;