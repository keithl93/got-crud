import React from 'react';
import video from '../assets/video.mp4';

export default function Video() {
  return (
    // <div className="vid-container">
    <div className='over'>
      <video src={video} autoPlay loop muted />
      <div className='v-container'></div>
    </div>
    // </div>
  );
}
