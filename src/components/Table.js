import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { filterData, data } = useContext(PlanetsContext);
  const renderFilterData = () => {
    if (filterData.length > 0) {
      return (
        <tbody>
          {filterData.map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((value, index2) => (
                <td key={ index2 }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          {Object.keys(data[0]).map((planetData, index) => (
            <th key={ index }>{planetData}</th>
          ))}
        </tr>
      </thead>
      {renderFilterData()}
    </table>
  );
}

export default Table;
