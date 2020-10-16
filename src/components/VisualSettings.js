import React, { useContext, useState } from 'react';
import { ChromePicker } from 'react-color';
import { CHANGE_CANVAS_COLOR, CHANGE_CANVAS_OPACITY } from '../constants';
import { AppContext } from '../store/context';


const VisualSettings = () => {
  const { state,  dispatch } = useContext(AppContext);
  const [ opacity, setOpacity] = useState(state.canvas.opacity);

  const handleColorChange = (color) => {
    dispatch({
      type: CHANGE_CANVAS_COLOR,
      payload: color.hex
    })
  };

  const handleSubmit = (event) =>{
    event.preventDefault();

    dispatch({
      type: CHANGE_CANVAS_OPACITY,
      payload: Number(opacity)
    });
  }

  const handleOpacityChange = (event) => {
    setOpacity(event.target.value)
  }

  return (
    <section className="visual-settings">
      <ChromePicker
        onChangeComplete={handleColorChange}
        color={state.canvas.color}
      />
     
      <form className="opacity-form" onSubmit={handleSubmit}>
        <label>Opacity: </label>
        <input
          type="number"
          min="0"
          max="100"
          value={opacity}
          onChange={handleOpacityChange}
          />
        <span>%</span>
      </form>
      
    </section>
  );
};

export default VisualSettings;