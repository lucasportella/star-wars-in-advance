import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    data,
    filterData,
    filterText,
    handleChange,
    handleSearch,
  } = useContext(PlanetsContext);
  if (!data || !filterData) {
    return null;
  }
  return (
    <div>
      <input onChange={ handleChange } value={ filterText } data-testid="name-filter" />
      <button onClick={ handleSearch } type="button">Pesquisar</button>
    </div>
  );
}

export default Filter;
