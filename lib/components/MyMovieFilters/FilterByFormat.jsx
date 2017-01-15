import React from 'react'
import Select from 'react-select';


const FilterByFormat = ({ filter, currentFormat }) => {
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
        value={currentFormat}
        autofocus
        clearable={false}
        className="movie-filter"
        searchable={false}
        placeholder="Select Movie Format..."
        options={options}
        onChange={filter}
    />
  )
}

export default FilterByFormat
