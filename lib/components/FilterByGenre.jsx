import React from 'react'
import logo from '../images/reel.png'
import Select from 'react-select';


const FilterByGenre = ({ filter, currentFilter }) => {
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
        value={currentFilter}
        autofocus
        searchable={false}
        placeholder="Select Movie Format..."
        options={options}
        onChange={filter}
    />
  )
}

export default FilterByGenre
