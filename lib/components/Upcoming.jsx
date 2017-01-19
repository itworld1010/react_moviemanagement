import React, { Component } from 'react';
import UpcomingCard from './UpcomingCard';
import PopularMovieCard from './PopularMovieCard';
const $ = require('jquery');

export default class Upcoming extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      upcoming: [],
      popular: [],
    };
  }

  componentWillMount() {
    const user = this.props.user;
    this.setState({ user });
    this.getMovies()
  }


  getMovies() {
     $.get("https://api.themoviedb.org/3/movie/upcoming?api_key=3b0cb67fa2d52569a7722e1614ea5df3&language=en-US&region=US",
     function(upcoming) {
       this.setState({
         upcoming: upcoming.results,
       })
     }.bind(this))

     $.get("https://api.themoviedb.org/3/movie/popular?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1",
     function(popular) {
       this.setState({
         popular: popular.results,
       })
     }.bind(this))
  }

  render() {
    return (
      <div>
      <h3 className="upcoming-header">Recent & Upcoming</h3>
      <article className="upcoming-card-container">
        <div className="upcoming-card-container-inner">
        {this.state.upcoming.map(m =>
          <UpcomingCard movie={m} key={m.id} user={this.state.user}/>
        )}
        </div>
      </article>
      <h3 className="upcoming-header">Popular Movies</h3>
      <article className="upcoming-card-container">
        <div className="upcoming-card-container-inner">
        {this.state.popular.map(m =>
          <PopularMovieCard movie={m} key={m.id} user={this.state.user}/>
        )}
        </div>
      </article>
      </div>
    );
  }
}
