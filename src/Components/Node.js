import React from 'react';
import './Node.css';

const Node = ({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
  isVisited,
  isShortestPath,
 
}) => {
  const nodeClassName = `node ${isVisited ? 'node-visited' : ''} ${isShortestPath ? 'node-shortest-path' : ''}`;
  const extraClassName = isStart
    ? 'node-start'
    : isFinish
    ? 'node-finish'
    : isWall
    ? 'node-wall'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={nodeClassName}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    >
      <div className={`node ${extraClassName}`} />
    </div>
  );
};

export default Node;


