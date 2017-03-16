import React, { Component } from 'react';

export const ActorCard = ({ cast }) => {
    return (
      <article className="actor-card">
          { cast.profile_path ?
            <img className="actor-image" src={'https://image.tmdb.org/t/p/w500' + cast.profile_path}/>
          :
            <img src="https://firebasestorage.googleapis.com/v0/b/moviekeeper-65458.appspot.com/o/no-image.png?alt=media&token=d83cb4eb-b286-4937-b980-00b080663277" className="actor-image"/>
          }
          <p className="actor-card-character">{cast.character}</p>
          <p className="actor-card-name">{cast.name}</p>
      </article>
    );
}
