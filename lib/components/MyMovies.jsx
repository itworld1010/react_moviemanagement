import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';
import { pick, map, extend, filter, keyBy } from 'lodash';
import PersonalMovieCard from './PersonalMovieCard'
import PersonalMovieSearch from './PersonalMovieSearch'

export default class MyMovies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movies: [],
      filtered: [],
      genres:[]
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

  genreSwitch(genreID) {
     if (genreID === 28){return "Action"}
     else if (genreID === 12){return "Adventure"}
     else if (genreID === 16){return "Animation"}
     else if (genreID === 35){return "Comedy"}
     else if (genreID === 80){return "Crime"}
     else if (genreID === 99){return "Documentary"}
     else if (genreID === 18){return "Drama"}
     else if (genreID === 10751){return "Family"}
     else if (genreID === 14){return "Fantasy"}
     else if (genreID === 36){return "History"}
     else if (genreID === 27){return "Horror"}
     else if (genreID === 10402){return "Music"}
     else if (genreID === 9648){return "Mystery"}
     else if (genreID === 10749){return "Romance"}
     else if (genreID === 878){return "Science Fiction"}
     else if (genreID === 10770){return "TV Movie"}
     else if (genreID === 53){return "Thriller"}
     else if (genreID === 10752){return "War"}
     else if (genreID === 5373){return "Western"}
   }

  render() {

    let { user } = this.state
    let { DVD, Bluray, Prime, iTunes } = this.state
    let filteredMovieDisplay = this.state.filtered.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)
    let movieDisplay = this.state.movies.map(m => <PersonalMovieCard {...m} user={user} key={m.key} id={m.key}/>)
    // let genres = this.state.movie.genres
    // console.log(genres);


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
