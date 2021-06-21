import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const Provider = ({ children }) => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [filterText, setFilterText] = useState('');

  const fetchPlanets = async () => {
    try {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then(
        (resp) => resp.json(),
      );
      results.forEach((planet) => {
        delete planet.residents;
      });
      setData(results);
      setFilterData(results);
    } catch (error) {
      console.log('Ocorreu um erro na requisição à API.');
    }
  };

  const filterPlanets = () => {
    if (filterText !== '') {
      const filterResult = data.filter((planet) => planet.name.includes(filterText));
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

  const providerContext = {
    data,
    filterData,
    filterText,
    fetchPlanets,
    handleSearch,
    handleChange,
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
