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
      <button onClick={ handleSearch } type="button">
        Pesquisar
      </button>
      <form>
        <label htmlFor="select1">
          <select name="select1" id="select1" data-testid="column-filter">
            <option value="population">População</option>
            <option value="orbital_period">Período de órbita</option>
            <option value="diameter">Diâmetro</option>
            <option value="rotation_period">Período de rotação</option>
            <option value="surface_water">Água na superfície</option>
          </select>
        </label>
        <label htmlFor="select2">
          <select data-testid="comparison-filter">
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="select3">
          <input type="number" data-testid="value-filter" />
        </label>
        <button type="button" data-testid="button-filter">Adicionar filtro</button>
      </form>
    </div>
  );
}

export default Filter;
