import React, { useState, useContext } from 'react';
import { Stage, Layer, Line, } from 'react-konva';
import { AppContext } from '../store/context';
import DrawHeader from './DrawHeader';
import Tools from './Tools';
import VisualSettings from './VisualSettings';


const Draw = () => {
  const { state: { tool, canvas } } = useContext(AppContext);

  const [isTouchDown, setIsTouchDown] = useState(false)
  const [lines, setLines] = useState([]);

  const handleDrawStart = (event) => {
    setIsTouchDown(true);
    const pos = event.target.getStage().getPointerPosition();
    setLines([...lines, { tool: tool.type, points: [pos.x, pos.y] }]);
  }

  const handleDraw = (event) => {
    if (!isTouchDown)  return;
    
    const stage = event.target.getStage();

    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  const handleDrawEnd = (event) => {
    setIsTouchDown(false);
  }

  return (
    <section>
      <DrawHeader />
      <section className="draw-wrapper">
        <Tools />
        <VisualSettings />
      </section>
      <Stage
        width={(window.innerWidth - 190) * canvas.zoom}
        height={(window.innerHeight - 120) * canvas.zoom}
        onMouseDown={handleDrawStart}
        onTouchStart={handleDrawStart}
        onMouseMove={handleDraw}
        onTouchMove={handleDraw}
        onMouseUp={handleDrawEnd}
        scaleY={canvas.zoom}
        scaleX={canvas.zoom}
        >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </section>
  );
};

export default Draw;
