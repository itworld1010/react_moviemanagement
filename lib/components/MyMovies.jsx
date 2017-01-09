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
    })

    console.log(find(this.state.movies));
  }

  filterByFormat(format) {
    let selectedFormat = format.value
    if(selectedFormat.value !== 'Show-all')
      {this.setState({ [selectedFormat]: !this['state'][selectedFormat] })
      let filtered = filter(this.state.movies, (o) => o.movie[selectedFormat])
      this.setState({ filtered: filtered})
    } else {
      this.setState({ filtered: [] })
    }
  }

  render() {

    let { user } = this.state
    let { DVD, Bluray, Prime, iTunes } = this.state
    let filteredMovieDisplay = this.state.filtered.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)
    let movieDisplay = this.state.movies.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)

    return (
      <div>
        <div className="p-movie-search">
          <PersonalMovieSearch filter={this.filterByFormat.bind(this)} />
        </div>
        <div className="my-movie-card-container">
          {this.state.filtered.length === 0 ? movieDisplay : filteredMovieDisplay }
        </div>
      </div>
    )
  }
}
