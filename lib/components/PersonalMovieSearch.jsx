import React from 'react'
import logo from '../images/reel.png'
import Select from 'react-select';


const PersonalMovieSearch = ({ filter }) => {
  var options = [
      { value: 'Show-all', label: 'Show All' },
      { value: 'Bluray', label: 'Blu-ray' },
      { value: 'DVD', label: 'DVD' },
      { value: 'iTunes', label: 'iTunes' },
      { value: 'Prime', label: 'Prime' }
  ];

  return(
    <Select
        name="form-field-name"
        value="one"
        placeholder="Select Movie Format..."
        options={options}
        onChange={filter}
    />
  )
}

export default PersonalMovieSearch
