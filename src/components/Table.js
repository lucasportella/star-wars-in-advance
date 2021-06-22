import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filterData } = useContext(PlanetsContext);

  if (!filterData || !data) {
    return <h1>Loading...</h1>;
  }
  return (
    <table border="1">
      <thead>
        <tr>
          {Object.keys(data[0]).map((planetData, index) => (
            <th key={ index }>{planetData}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filterData.map((planet, index) => (
          <tr key={ index }>
            {Object.values(planet).map((value, index2) => (
              <td key={ index2 }>{ value }</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
