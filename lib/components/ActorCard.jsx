import React, { Component } from 'react';
import npa from '../images/no-image.png'

export default class MovieCard extends Component {
  render() {
    return (
      <article className="actor-card">
          { this.props.cast.profile_path ?
            <img className="actor-image" src={'https://image.tmdb.org/t/p/w500' + this.props.cast.profile_path}/>
          :
            <img src={npa} className="actor-image"/>
          }
          <p className="actor-card-character">{this.props.cast.character}</p>
          <p className="actor-card-name">{this.props.cast.name}</p>
      </article>
    );
  }
}
