import React, { useContext } from 'react';
import Canvas from './components/Canvas';
import AppHeader from './components/AppHeader';
import { AppContext } from './store/context';

import './styles/App.scss';


function App() {
  const { state: { tab } } = useContext(AppContext);
  
  return (
    <div className="App">
    <AppHeader />
    { tab === 'draw' ? <Canvas /> : <p>Statistics</p> }
    </div>
  );
}

export default App;
