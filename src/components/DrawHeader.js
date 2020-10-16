import React, { useContext } from 'react';
import Slider, { Range } from 'rc-slider';
import { AppContext } from '../store/context';
import { CHANGE_CANVAS_ZOOM } from '../constants';

const DrawHeader = () => {
  const { dispatch } = useContext(AppContext);

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch({
      type: CHANGE_CANVAS_ZOOM,
      payload: Number(value)
    })
    
  }
  return (
    <header className="draw-header">
    <label htmlFor="zoom">Image zoom: </label>
      <select id="zoom" onChange={handleChange}>
        <option value="1">100%</option>
        <option value="0.8">80%</option>
        <option value="0.5">50%</option>
        <option value="0.3">30%</option>
        <option value="0.1">10%</option>
      </select>

      <Slider value="100" />
      <Range />
    </header>
  );
};

export default DrawHeader;