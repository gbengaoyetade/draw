import React, { useContext } from 'react';
import ReactSlider from 'react-slider'
import { AppContext } from '../store/context';
import { CHANGE_CANVAS_ZOOM, CHANGE_TOOL_SIZE } from '../constants';

const DrawHeader = () => {
  const { state: { tool }, dispatch } = useContext(AppContext);

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch({
      type: CHANGE_CANVAS_ZOOM,
      payload: Number(value)
    })
    
  }

  const handleSliderChange = (value) => {
    console.log({ value })
    dispatch({
      type: CHANGE_TOOL_SIZE,
      payload: value
    })
  }
  console.log({ size: tool.size })
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
    <label>Brush size: </label>
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      onBeforeChange={val => console.log('onBeforeChange value:', val)}
      onChange={handleSliderChange}
      onAfterChange={val => console.log('onAfterChange value:', val)}
      renderThumb={(props, state) => <div {...props}>{tool.size}</div>}
    />
    </header>
  );
};

export default DrawHeader;