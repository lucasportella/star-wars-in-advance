import React, { useContext } from 'react';
import './App.css';
import Provider from './context/Provider';
import Filter from './components/Filter';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
