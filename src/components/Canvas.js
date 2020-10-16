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
    setLines([...lines, { tool: tool.type, points: [pos.x, pos.y], size: tool.size }]);
  }

  const handleDraw = (event) => {
    if (!isTouchDown)  return;
    
    const stage = event.target.getStage();

    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    localStorage.setItem('currentDrawing', stage.toJSON())
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
        <section className="draw-area" style={{ background: canvas.color }}>
          <Stage
          width={(window.innerWidth - 300) * canvas.zoom}
          height={(window.innerHeight - 120) * canvas.zoom}
          onMouseDown={handleDrawStart}
          onTouchStart={handleDrawStart}
          onMouseMove={handleDraw}
          onTouchMove={handleDraw}
          onMouseUp={handleDrawEnd}
          scaleY={canvas.zoom}
          scaleX={canvas.zoom}
          opacity={canvas.opacity/100}
          >
          <Layer>
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke="#000"
                strokeWidth={line.size}
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
          </Stage>
          
        </section>
        <VisualSettings />
      </section>
      
    </section>
  );
};

export default Draw;
