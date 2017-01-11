import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import UpcomingCard from './UpcomingCard'

export default class Upcoming extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movieResults: []
    }
  }

  componentWillMount() {
    let user = this.props.user
    this.setState({ user })

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1`)
    .then((response) => response.json())
    .then((data) => data)
    .then((movies) => this.setState({ movieResults: movies.results}))
  }


  render() {

    return (
      <article className="upcoming-card-container">
        {this.state.movieResults.map((m, i) =>
          <UpcomingCard movie={m} key={m.id} user={this.state.user}/>
        )}
      </article>
    )
  }
}
