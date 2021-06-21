import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, fetchPlanets } = useContext(PlanetsContext);
  fetchPlanets();
  if (!data) {
    return <h1>Loading...</h1>;
  }
  const headerData = data[0];
  return (
    <table border="1">
      {Object.keys(headerData).map((planetData, index) => (
        <th key={ index }>{planetData}</th>
      ))}
      {data.map((planet, index) => (
        <tr key={ index }>
          {Object.values(planet).map((value, index2) => (
            <td key={ index2 }>{ value }</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default Table;
