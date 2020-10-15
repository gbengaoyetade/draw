import React from 'react';
import Draw from './components/Draw';
import DrawHeader from './components/DrawHeader';
import Tools from './components/Tools';
import VisualSettings from './components/VisualSettings';

import './styles/App.scss';


function App() {
  
  return (
    <div className="App">
    <header className="app-header">
      <button className="header-button">
        <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
        <span>Draw</span>
      </button>
      <button className="header-button">
        <span><i class="fa fa-bar-chart" aria-hidden="true"></i></span>
        <span>Statistic</span>
      </button>
    </header>
    <DrawHeader />
    <section className="draw-wrapper">
      <Tools />
      <Draw />
      <VisualSettings />
    </section>
     
    </div>
  );
}

export default App;
