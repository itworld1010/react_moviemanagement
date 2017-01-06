import React, { Component } from 'react';

export default class MovieCard extends Component {

  render() {

    return (
      <div>
        <p>{this.props.movie.title}</p>
        <p>{this.props.movie.overview}</p>
        <button>Movie Detail</button>
      </div>
    )
  }
}
