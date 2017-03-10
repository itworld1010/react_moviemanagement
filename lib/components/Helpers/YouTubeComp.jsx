import React from 'react';
import YouTube from 'react-youtube'

export const YouTubeComp = ({ youtubeID, toggleTrailer }) => {
    return (
      <div className="youtube-container">
      <div className="youtube-background" onClick={() => toggleTrailer()}></div>
      { youtubeID ?
        <YouTube
          className="youtube"
          controls="1"
          videoId={youtubeID}
          loop="1"
        />
      :
        <YouTube
          className="youtube"
          controls="1"
          fs
          videoId='dQw4w9WgXcQ'
        />
      }
      </div>
    );
}
