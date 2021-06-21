import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    data,
    filterData,
    filterText,
    handleChange,
    handleSearch,
    handleSelect,
    searchByNumber,
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
          <select
            onChange={ handleSelect }
            name="column"
            id="select1"
            data-testid="column-filter"
          >
            <option value="population">População</option>
            <option value="orbital_period">Período de órbita</option>
            <option value="diameter">Diâmetro</option>
            <option value="rotation_period">Período de rotação</option>
            <option value="surface_water">Água na superfície</option>
          </select>
        </label>
        <label htmlFor="select2">
          <select
            onChange={ handleSelect }
            name="comparison"
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="select3">
          <input
            onChange={ handleSelect }
            name="value"
            type="number"
            data-testid="value-filter"
          />
        </label>
        <button
          onClick={ searchByNumber }
          type="button"
          data-testid="button-filter"
        >
          Adicionar filtro
        </button>
      </form>
    </div>
  );
}

export default Filter;
