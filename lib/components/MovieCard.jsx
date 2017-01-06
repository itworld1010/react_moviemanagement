import React, { Component } from 'react';
import logo from '../images/no-poster.png'



export default class MovieCard extends Component {

  render() {

    return (
      <article className="movie-card">
        <p>{this.props.movie.title}</p>
        <p>{this.props.movie.overview}</p>
        {this.props.movie.poster_path ? <img className="poster" src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path}/> : <img src={logo} className="poster"/>}
        <button>Movie Detail</button>
      </article>
    )
  }
}
