import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    filterText,
    handleChange,
    handleSelect,
    searchByNumber,
    columnSelect,
  } = useContext(PlanetsContext);
  const { filterData, data } = useContext(PlanetsContext);
  if (!filterData || !data || data.length === 0) { return <h1>Loading...</h1>; }
  return (
    <div>
      <input onChange={ handleChange } value={ filterText } data-testid="name-filter" />
      <form>
        <label htmlFor="select1">
          <select
            onChange={ handleSelect }
            name="column"
            id="select1"
            data-testid="column-filter"
          >
            {columnSelect.map((column, index) => (
              <option
                key={ index }
                value={ column.value }
              >
                { column.value }
              </option>))}
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
