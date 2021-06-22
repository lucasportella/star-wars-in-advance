import React, { useContext } from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { filterData } = useContext(PlanetsContext);
  if (!filterData || filterData.length === 0) { return <h1>Loading...</h1>; }
  return (
    <>
      <Filter />
      <Table />
    </>
  );
}

export default App;
