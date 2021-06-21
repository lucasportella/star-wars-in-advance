import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import response from '../testData';

const Provider = ({ children }) => {
  const numbersDefault = {
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  };

  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(numbersDefault);

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

  const filterPlanets = () => {
    if (filterText !== '') {
      const filterResult = data.filter(
        (planet) => planet.name.toLowerCase().includes(filterText),
      );
      setFilterData(filterResult);
    } else {
      setFilterData(data);
    }
  };

  const handleSearch = () => {
    filterPlanets();
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
    handleSearch,
    handleChange,
    filterNumber,
    handleSelect,
  };

  return (
    <PlanetsContext.Provider value={ providerContext }>
      {children}
    </PlanetsContext.Provider>);
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
