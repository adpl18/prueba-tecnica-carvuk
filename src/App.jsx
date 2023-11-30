import React from 'react';
import AppRouter from './router/AppRouter';
import './styles/styles.css';

const App = () => {
  return (
    <>
      <div className='app-header'>
        <h3>Prueba técnica Carvuk</h3>
      </div>
      <AppRouter />
    </>
  );
};

export default App;
