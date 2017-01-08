import React, { Component } from 'react';
import npa from '../images/no-poster.png'
import firebase from '../firebase';



export default class PersonalMovieCard extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movie: null,
      DVD: '',
      Bluray: '',
      iTunes: '',
      Prime: '',
      viewDetailClick: false
    }
  }

  componentWillMount() {
    let user = this.props.user
    let movie = this.props.movie
    let DVD = this.props.movie.DVD
    let Bluray = this.props.movie.Bluray
    let Prime = this.props.movie.Prime
    let iTunes = this.props.movie.iTunes
    let id = this.props.id
    this.setState({ user, movie, DVD, Bluray, iTunes, Prime, id })
  }

  addNewMovie(movie) {
    const { user } = this.state;
    firebase.database().ref('users/' + user.displayName).push({
      movie: movie
    });
  }

  updateFormat(format){
    let { user } = this.state
    let title = this.state.id
    console.log(title);
    this.setState({ [format]: !this['state'][format]})
    let state = !this.state[format]
    firebase.database().ref('users/' + user.displayName).child(title).child('movie').update({
      [format]: state
    })
  }

  render() {

    return (
      <article className="movie-card">
        {this.state.movie.movie.poster_path ?
          <img
          className="poster"
          src={"https://image.tmdb.org/t/p/w500" + this.state.movie.movie.poster_path}
          />
          : <img src={npa} className="poster"/>}
        <article>
          {!this.state.viewDetailClick?
            <div>
              <p className="card-title" >{this.state.movie.movie.title}
                <span className="release-year">({this.state.movie.movie.release_date.substring(0, 4)})</span>
              </p>
              <p className="card-body">{this.state.movie.movie.overview}</p>
            </div>
            :
            <form>
              <input className={this.state.DVD ? 'format-true' : 'format-false'} type="button" value="DVD" onClick={() => this.updateFormat('DVD')}/>
              <input className={this.state.Bluray ? 'format-true' : 'format-false'} type="button" value="Blu-ray" onClick={() => this.updateFormat('Bluray')}/>
              <input className={this.state.iTunes ? 'format-true' : 'format-false'} type="button" value="iTunes" onClick={() => this.updateFormat('iTunes')}/>
              <input className={this.state.Prime ? 'format-true' : 'format-false'} type="button" value="Prime" onClick={() => this.updateFormat('Prime')}/>
            </form>
          }
        </article>
        <article>
          { !this.state.viewDetailClick ?
            <button
            onClick={() => {this.setState({ viewDetailClick: !this.state.viewDetailClick })}}
            className="movie-card-button"
            >View Formats
            </button>
            :
            <button
            onClick={() => {this.setState({ viewDetailClick: !this.state.viewDetailClick })}}
            className="movie-card-button"
            >View Overview
            </button>
          }
        </article>
      </article>
    )
  }
}
