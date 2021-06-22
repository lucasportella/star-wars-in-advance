import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import response from '../testData';

const Provider = ({ children }) => {
  const numbersDefault = {
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  };

  const columnSelectArray = [
    { value: 'population', text: 'População' },
    { value: 'orbital_period', text: 'Período de órbita' },
    { value: 'diameter', text: 'Diâmetro' },
    { value: 'rotation_period', text: 'Período de rotação' },
    { value: 'surface_water', text: 'Água na superfície' },
  ];

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(numbersDefault);
  const [columnSelect, setColumnSelect] = useState(columnSelectArray);

  const fetchPlanets = async () => {
    // try {
    //   const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then(
    //     (resp) => resp.json(),
    //   );
    //   results.forEach((planet) => {
    //     delete planet.residents;
    //   });
    //   setData(results);
    //   setFilterData(results);
    // } catch (error) {
    //   console.log('Ocorreu um erro na requisição à API.');
    // }

    response.results.forEach((planet) => {
      delete planet.residents;
    });
    setData(response.results);
    setFilterData(response.results);
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchPlanets();
    }
  });

  useEffect(() => {
    if (filterText !== '') {
      const filterByNameResult = data.filter(
        (planet) => planet.name.toLowerCase().includes(filterText.toLowerCase()),
      );
      if (filterByNameResult.length > 0) {
        setFilterData(filterByNameResult);
      } else {
        setFilterData([]);
      }
    } else {
      setFilterData(data);
    }
  }, [filterText, data]);

  const searchByNumber = () => {
    const filterByNumberResult = data.filter((planet) => {
      const { column, comparison, value } = filterNumber;
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      if (comparison === 'igual a') {
        return Number(planet[column]) === Number(value);
      }
      return false;
    });
    setFilterData(filterByNumberResult);
  };

  const handleChange = ({ target: { value } }) => {
    setFilterText(value);
  };

  const handleSelect = ({ target: { value, name } }) => {
    setFilterNumber({ ...filterNumber, [name]: value });
  };

  const providerContext = {
    data,
    filterData,
    filterText,
    fetchPlanets,
    handleChange,
    filterNumber,
    handleSelect,
    searchByNumber,
    columnSelect,
  };

  return (
    <PlanetsContext.Provider value={ providerContext }>
      {children}
    </PlanetsContext.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
