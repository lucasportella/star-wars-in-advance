import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Filter from './components/Filter';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
