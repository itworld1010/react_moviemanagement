import React, { Component } from 'react';
import YouTube from 'react-youtube'


export default class YouTubeComp extends Component {
  render() {
    return (
      <div>
      { this.props.youtubeID ?
        <YouTube
          className="youtube"
          controls="1"
          videoId={this.props.youtubeID}
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
}
