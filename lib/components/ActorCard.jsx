import React, { Component } from 'react';
import npa from '../images/no-image.png'

export const ActorCard = ({ cast }) => {
    return (
      <article className="actor-card">
          { cast.profile_path ?
            <img className="actor-image" src={'https://image.tmdb.org/t/p/w500' + cast.profile_path}/>
          :
            <img src={npa} className="actor-image"/>
          }
          <p className="actor-card-character">{cast.character}</p>
          <p className="actor-card-name">{cast.name}</p>
      </article>
    );
}
