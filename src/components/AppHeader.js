import React, { useContext } from 'react';
import { AppContext } from '../store/context';
import { CHANGE_TAB } from '../constants';



const AppHeader = () => {
  const { state: { tab }, dispatch } = useContext(AppContext);

  const handleClick = (tab) => {
    dispatch({
      type: CHANGE_TAB,
      payload: tab
    });
  }

  return (
    <header className="app-header">
      <button
        className={tab === 'draw' ? 'header-button active-button' : 'header-button'}
        onClick={() => handleClick('draw')}

        >
        <span><i className="fa fa-pencil" aria-hidden="true"></i></span>
        <span>Draw</span>
      </button>
      <button
        className={tab === 'stats' ? 'header-button active-button' : 'header-button'}
        onClick={() => handleClick('stats')}
      >
        <span><i className="fa fa-bar-chart" aria-hidden="true"></i></span>
        <span>Statistic</span>
      </button>
    </header>
  );
}

export default AppHeader;
