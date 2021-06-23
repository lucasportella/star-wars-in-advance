import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
// import ProviderHooks from '../hooks/ProviderHooks';
import response from '../testData';

const Provider = ({ children }) => {
  const numbersDefault = {
    column: 'population',
    comparison: 'maior que',
    value: '',
  };

  const generateCorrectOrder = (array) => {
    const isSmaller = -1;
    return array.sort((a, b) => {
      if (a.arrayIndex > b.arrayIndex) {
        return 1;
      }
      if (a.arrayIndex < b.arrayIndex) {
        return isSmaller;
      }
      return 0;
    });
  };

  const columnSelectArray = [
    { valor: 'population', arrayIndex: 0 },
    { valor: 'orbital_period', arrayIndex: 1 },
    { valor: 'diameter', arrayIndex: 2 },
    { valor: 'rotation_period', arrayIndex: 3 },
    { valor: 'surface_water', arrayIndex: 4 },
  ];

  const findIndex = (valor) => {
    let objectWithIndex = {};
    columnSelectArray.forEach((column) => {
      if (column.valor === valor) {
        objectWithIndex = { valor, arrayIndex: column.arrayIndex };
      }
    });
    return objectWithIndex;
  };

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterNumber, setFilterNumber] = useState(numbersDefault);
  const [columnSelect, setColumnSelect] = useState(columnSelectArray);
  const [filterLayer, setFilterLayer] = useState([]);
  const [newResultFromLayer, setNewResultFromLayer] = useState([]);

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
    setNewResultFromLayer(response.results);
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

  const addFilter = (column, comparison, value, filterType) => {
    const filterByNumberResult = filterType.filter((planet) => {
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
    return filterByNumberResult;
  };

  const searchByNumber = () => {
    const { column, comparison, value } = filterNumber;
    setFilterLayer([...filterLayer, filterNumber]);
    const filterByNumberResult = addFilter(column, comparison, value, filterData);
    setFilterData(filterByNumberResult);
    const newColumnSelect = columnSelect.filter((option) => option.valor !== column);
    if (newColumnSelect.length > 0) {
      setFilterNumber({ ...filterNumber, column: newColumnSelect[0].valor });
    } else { setFilterNumber({ ...filterNumber, column: '' }); }
    setColumnSelect(newColumnSelect);
  };

  const handleChange = ({ target: { value } }) => {
    setFilterText(value);
  };

  const handleSelect = ({ target: { value, name } }) => {
    setFilterNumber({ ...filterNumber, [name]: value });
  };

  const newFilteredResultsAfterDelete = () => {
    filterLayer.forEach((filter) => {
      const oneFilterResult = addFilter(
        filter.column, filter.comparison, filter.value, newResultFromLayer,
      );
      setNewResultFromLayer(oneFilterResult);
    });
    setFilterData(newResultFromLayer);
  };

  const handleDeleteLayer = ({ target: { value } }) => {
    const newFiltersAfterDelete = filterLayer.filter((filter) => filter.column !== value);
    setFilterLayer(newFiltersAfterDelete);
    const correctPositionColumn = findIndex(value);
    setColumnSelect([...columnSelect, correctPositionColumn]);
    newFilteredResultsAfterDelete();
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
    generateCorrectOrder,
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
