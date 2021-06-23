import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../App.css';

function Filter() {
  const {
    filterText,
    handleChange,
    handleSelect,
    searchByNumber,
    columnSelect,
    filterLayer,
    handleDeleteLayer,
    generateCorrectOrder,
  } = useContext(PlanetsContext);
  const columnSelectCorrectOrder = generateCorrectOrder(columnSelect);
  const renderFilterLayer = () => {
    if (filterLayer.length > 0) {
      return (
        <span>
          {filterLayer.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <span className="Filter">{filter.column}</span>
              <span className="Filter">{filter.comparison}</span>
              <span className="Filter">{filter.value}</span>
              <button
                onClick={ handleDeleteLayer }
                value={ filter.column }
                type="button"
              >
                X
              </button>
            </div>
          ))}
        </span>
      );
    }
  };
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
            {columnSelectCorrectOrder.map((column, index) => (
              <option
                key={ index }
                value={ column.valor }
              >
                { column.valor }
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
      {renderFilterLayer()}
    </div>
  );
}

export default Filter;
