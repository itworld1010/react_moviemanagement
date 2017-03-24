import React from 'react';
import YouTube from 'react-youtube'
var classNames = require('classnames');


export const YouTubeComp = ({ youtubeID, toggleTrailer, showTrailer }) => {
  let trailerShow = showTrailer ? 'show-trailer' : 'hide-trailer'
  let trailer = classNames('youtube-container', trailerShow)
  let opts = {
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 1
    }
  }
    return (
      <div className={trailer}>
      <div className="youtube-background" onClick={() => toggleTrailer()}></div>
      { youtubeID ?
        <YouTube
          className="youtube"
          videoId={youtubeID}
          opts={opts}
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
