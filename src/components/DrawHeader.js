import React from 'react';
import Slider, { Range } from 'rc-slider';

const DrawHeader = () => {
  return (
    <header className="draw-header">
    <label htmlFor="zoom">Image zoom: </label>
      <select id="zoom">
        <option value="100">100%</option>
        <option value="80">80%</option>
        <option value="50">50%</option>
      </select>

      <Slider value="100" />
      <Range />
    </header>
  );
};

export default DrawHeader;