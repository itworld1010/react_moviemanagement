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
          { this.state.cast.profile_path ?
            <img className="actor-image" src={"https://image.tmdb.org/t/p/w500" + this.state.cast.profile_path}/>
          :
            <img src={npa} className="actor-image"/>
          }
          <p className="actor-card-name">{this.state.cast.name}</p>
      </article>
    )
  }
}
