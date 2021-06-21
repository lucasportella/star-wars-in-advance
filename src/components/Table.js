import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filterData, fetchPlanets } = useContext(PlanetsContext);
  useEffect(() => {
    fetchPlanets();
  }, []);

  if (!filterData || !data) {
    return <h1>Loading...</h1>;
  }
  const headerData = data[0];
  return (
    <table border="1">
      {Object.keys(headerData).map((planetData, index) => (
        <th key={ index }>{planetData}</th>
      ))}
      {filterData.map((planet, index) => (
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
