import React, { Component } from 'react';
import firebase from '../../firebase';
import { filter } from 'lodash';
import YouTube from 'react-youtube'
import RateMovie from '../RateMovie'
import ActorCard from '../ActorCard'

export default class UpcomingMovieModal extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    const user = this.props.user;
    const movie = this.props.movie;
    this.setState({ user, movie })
}

  render() {
    const director = filter(this.props.credits.crew, { job: 'Director' }).map(e => e.name).join(', ');
    const directorsArray = filter(this.props.credits.crew, { job: 'Director' });
    const writers = (filter(this.props.credits.crew, { department: 'Writing' })).map(e => e.name).join(', ');
    const writersArray = filter(this.props.credits.crew, { department: 'Writing' });

    return (
      <div>
      <div className="modal-background" onClick={() => this.props.close()}></div>
      <div className="modal-container" >
      <div className="modal-header" >
                  <div className="modal-title absolute-center"><span className="relative-center">{this.props.movie.original_title}</span><img onClick={() => this.props.close()} src="../lib/images/X.png" className="modal-top-exit"/></div>
                  </div>
                  <a name="details" />
                <div className="modal-body">
                  <img className="modal-backdrop" src={'https://image.tmdb.org/t/p/w500' + this.props.movie.backdrop_path} />
                  <div className="absolute-center to-deets-abs-center">
                    <a className="trailer-link relative-center" href="#trailer">Trailer</a>
                  </div>
                  <div className="modal-movie-deets">
                  <table>
                  <tbody>
                    <tr>
                      <th>{directorsArray.length > 1 ? 'Directors:' : 'Director:'}</th>
                      <td>{director}</td>
                    </tr>
                    <tr>
                      <th>Genre:</th>
                      <td>{this.props.genreNamesArray.join(', ')}</td>
                    </tr>
                    <tr>
                      <th>Runtime:</th>
                      <td>{this.props.minutesConverter(this.props.runtime)}</td>
                    </tr>
                    <tr>
                      <th>{writersArray.length > 1 ? 'Writers:' : 'Writer:'}</th>
                      <td>{writers}</td>
                    </tr>
                    <tr>
                      <th>Plot:</th>
                      <td>{this.props.movie.overview}</td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                  <div className="actor-list">
                    {this.props.cast.map(m =>
                    <ActorCard cast={m} key={m.id}/>
                    )}
                  </div>
                  <div className="youtube-container">
                  <div className="absolute-center upcoming-back-to-deets-abs-center">
                    <a name="trailer" href="#details">Back to Details</a>
                  </div>
                  { this.props.youtubeID ?
                    <YouTube
                      className="youtube"
                      controls="1"
                      videoId={this.props.youtubeID}
                      loop="1"
                    />
                  :
                    <YouTube
                      className="youtube"
                      controls="1"
                      fs
                      videoId='dQw4w9WgXcQ'
                    />
                  }
                  </div>
                </div>
              </div>
              </div>
    );
  }
}
