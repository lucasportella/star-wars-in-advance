import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import ProviderHooks from '../hooks/ProviderHooks';
import response from '../testData';

const Provider = ({ children }) => {
  const numbersDefault = {
    column: 'population',
    comparison: 'maior que',
    value: '',
  };

  const columnSelectArray = [
    { value: 'population' },
    { value: 'orbital_period' },
    { value: 'diameter' },
    { value: 'rotation_period' },
    { value: 'surface_water' },
  ];

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(numbersDefault);
  const [columnSelect, setColumnSelect] = useState(columnSelectArray);
  const [filterLayer, setFilterLayer] = useState([]);

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
    fetchPlanets();
  }, []);

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
    const { column, comparison, value } = filterNumber;
    setFilterLayer([...filterLayer, filterNumber]);
    console.log(filterLayer);
    const filterByNumberResult = filterData.filter((planet) => {
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
    const newColumnSelect = columnSelect.filter((option) => option.value !== column);
    if (newColumnSelect.length > 0) {
      setFilterNumber({ ...filterNumber, column: newColumnSelect[0].value });
    } else { setFilterNumber({ ...filterNumber, column: '' }); }
    setColumnSelect(newColumnSelect);
  };

  const handleChange = ({ target: { value } }) => {
    setFilterText(value);
  };

  const handleSelect = ({ target: { value, name } }) => {
    setFilterNumber({ ...filterNumber, [name]: value });
  };

  const handleDeleteLayer = ({ target: { value } }) => {
    console.log(value)
    const newFiltersAfterDelete = filterLayer.filter((filter) => filter.column !== value);
    console.log(newFiltersAfterDelete)
    setFilterLayer(newFiltersAfterDelete);
  };

  const providerContext = {
    data,
    filterData,
    filterText,
    filterNumber,
    fetchPlanets,
    handleChange,
    handleSelect,
    searchByNumber,
    columnSelect,
    filterLayer,
    handleDeleteLayer,
  };

  if (!filterData || !data || data.length === 0) {
    return <h1>Loading...</h1>;
  }
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
