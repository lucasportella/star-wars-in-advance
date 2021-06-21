import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { data } = useContext(PlanetsContext);

  return (
    <div>
      <input />
      <button type="button">Pesquisar</button>
    </div>
  );
}

export default Filter;
