// need to find better alternative to alt text in button

import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';



export default class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      cast: null
    }
  }

  componentWillMount() {
    let cast = this.props.cast
    this.setState({ cast })
  }

  render() {

    return (
      <article className="actor-card">
        <p>{this.state.cast.name}</p>
        <img className="actor-image" src={"https://image.tmdb.org/t/p/w500" + this.state.cast.profile_path}/>
        {/* {this.state.cast.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}
          />
          : <img src={npa} className="poster"/>} */}
      </article>
    )
  }
}
