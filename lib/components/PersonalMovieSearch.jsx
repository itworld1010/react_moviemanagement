import React from 'react'
import logo from '../images/reel.png'

const PersonalMovieSearch = ({ filter, showAll }) => {
  return(
    <div>
      <button onClick={() => showAll() }>Show All</button>
      <button onClick={() => filter('Bluray')}>Blu-Ray</button>
      <button onClick={() => filter('DVD')}>DVD</button>
      <button onClick={() => filter('iTunes')}>iTunes</button>
      <button onClick={() => filter('Prime')}>Prime</button>
    </div>
  )
}

export default PersonalMovieSearch
