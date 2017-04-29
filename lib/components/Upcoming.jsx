import React, { Component } from 'react';
import PopularMovieCard from './PopularMovieCard';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class Upcoming extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      upcoming: [],
      popular: [],
      recentShow: false,
      popularShow: false
    };
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState({ user });
  }

  fetchRecent() {
    this.setState({ recentShow: !this.state.recentShow})

    if(this.state.upcoming == 0){
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1`)
      .then(response => response.json())
      .then(movies => this.setState({ upcoming: movies.results }));
    } else { null }  
  }

  fetchPopular(){
    this.setState({ popularShow: !this.state.popularShow})

    if(this.state.popular.length == 0) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1`)
      .then(response => response.json())
      .then(movies => this.setState({ popular: movies.results }))
    } else { null }
  }


  render() {
    return (
      <div className="explore">
      <h3 className="upcoming-header" onClick={() => this.fetchRecent()}>Recent & Upcoming</h3>
        { this.state.recentShow ?
        <article className="upcoming-card-container">
          <div className="upcoming-card-container-inner">
          {this.state.upcoming.map(m =>
            <PopularMovieCard movie={m} key={m.id} user={this.state.user}/>
          )}
          </div>
        </article>
        :
        null
      }
      <h3 className="upcoming-header" onClick={() => this.fetchPopular()}>Popular Movies</h3>
        {this.state.popularShow ?
        <article className="upcoming-card-container">
          <div className="upcoming-card-container-inner">
          {this.state.popular.map(m =>
            <PopularMovieCard movie={m} key={m.id} user={this.state.user}/>
          )}
          </div>
        </article>
        :
        null
      }
      </div>
    );
  }
}
