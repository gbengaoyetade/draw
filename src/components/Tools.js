import React, { useContext } from 'react';
import { AppContext } from '../store/context';
import { CHANGE_TOOL_TYPE } from '../constants';


const Tools = () => {
  const { state: { tool }, dispatch } = useContext(AppContext);

  const handleClick = (tool) => {
    dispatch({
      type: CHANGE_TOOL_TYPE,
      payload: tool,
    })
  }

  return (
  <section className="tools">
    <button
      className={tool.type==='source-over' ? 'tools-button active-tool': 'tools-button'}
      onClick={() =>handleClick('pen')}
    >
      <span><i className="fa fa-pencil" aria-hidden="true"></i></span>
    </button>
    <button
      className={tool.type==='destination-out' ? 'tools-button active-tool': 'tools-button'}
      onClick={() =>handleClick('destination-out')}
    >
      <span><i className="fa fa-eraser" aria-hidden="true"></i></span>
    </button>
  </section>
  );
};

export default Tools;
