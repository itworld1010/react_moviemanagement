import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { pick, map, extend, filter } from 'lodash';
import PersonalMovieCard from './PersonalMovieCard'
import PersonalMovieSearch from './PersonalMovieSearch'


export default class MyMovies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      filtered: [],
      DVD: false,
      iTunes: false,
      Prime: false,
      Bluray: false
    }
  }

  componentWillMount() {
   let user = this.props.user
   this.setState({ user })
  }

  componentDidMount() {
    firebase.database().ref('users/' + this.state.user.displayName).on('value', (snapshot) => {
      const movies = snapshot.val()
      this.setState({
        movies: map(movies, (val, key) => extend(val, { key }))
      });
    });
  }

  filterByFormat(format) {
    this.setState({ [format]: !this['state'][format] })
    let filtered = filter(this.state.movies, (o) => o.movie[format])
    this.setState({ filtered: filtered})
  }

  showAllMovies(){
    this.setState({ filtered: [] })
  }

  render() {

    let { user } = this.state
    let { DVD, Bluray, Prime, iTunes } = this.state
    let filteredMovieDisplay = this.state.filtered.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)
    let movieDisplay = this.state.movies.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)

    console.log(this.state.movies);

    return (
      <div>
        <PersonalMovieSearch showAll={this.showAllMovies.bind(this)} filter={this.filterByFormat.bind(this)} />
        {this.state.filtered.length === 0 ? movieDisplay : filteredMovieDisplay }
      </div>
    )
  }
}
