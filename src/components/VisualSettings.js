import React from 'react';
import { BlockPicker } from 'react-color';


const VisualSettings = () => {
  return (
    <section className="visual-settings">
      <BlockPicker />
      <label>Opacity: </label>
      <input type="text" />
    </section>
  );
};

export default VisualSettings;