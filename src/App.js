import React, { useContext } from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { filterData, data } = useContext(PlanetsContext);
  if (!filterData || !data || data.length === 0) { return <h1>Loading...</h1>; }
  return (
    <>
      <Filter />
      <Table />
    </>
  );
}

export default App;
