import React, {useState } from 'react'
import {randomMaze} from '../MazeAlgorithm/randomMaze';
import {SimpleMaze} from '../MazeAlgorithm/SimpleMaze';
import {StairCaseMaze} from '../MazeAlgorithm/StairCaseMaze';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/Dijkstra';
import { DFS } from '../Algorithms/DFS';
import { BFS } from '../Algorithms/BFS';
import './PathFinder.css';
import Node from './Node';

const START_NODE_ROW = 0;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

// grid creation
const createNode = (col, row) => ({
  col,
  row,
  isStart: row === START_NODE_ROW && col === START_NODE_COL,
  isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  distance: Infinity,
  isVisited: false,
  isWall: false,
  previousNode: null,
  isShortestPath: false,
});
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
};

const PathFinder = () => {
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);  


const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
};
  
const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
};
  
const handleMouseUp = () => {
    setMouseIsPressed(false);
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((node, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return {
            ...node,
            isWall: !node.isWall,
          };
        }
        return node;
      })
    );
    return newGrid;
};
//****************************Dijkstra Visualization*******************************//
const visualizeDijkstra = () => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animate(visitedNodesInOrder, nodesInShortestPathOrder);
}; 
//****************************Dijkstra Visualization*******************************//
const visualizeBFS = () => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = BFS(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animate(visitedNodesInOrder, nodesInShortestPathOrder);
}; 
//****************************DFS Visualization*******************************//
const visualizeDFS = () => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = DFS(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animate(visitedNodesInOrder, nodesInShortestPathOrder);
}; 

//****************************Animation Function*******************************//
const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row =>
          row.map(currNode =>
            currNode.row === node.row && currNode.col === node.col
              ? { ...currNode, isVisited: true }
              : currNode
          )
        );
        return newGrid;
      });
    }, 10 * i);
  }
  setTimeout(() => {
    animateShortestPath(nodesInShortestPathOrder);
  }, 10 * visitedNodesInOrder.length);
};

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        setGrid(prevState => {
          const updatedGrid = prevState.map(row =>
            row.map(currNode => {
              if (currNode.row === node.row && currNode.col === node.col) {
                return { ...currNode, isShortestPath: true };
              }
              return currNode;
            })
          );
          return updatedGrid;
        });
      }, 50 * i); 
    }
  };

//****************************Clear Walls*******************************//
const clearWalls = () => {
    if (!isRunning) {
      const newGrid = grid.map((row) =>
        row.map((node) => {
          if (node.isWall) {
            return createNode(node.col, node.row);
          }
          return node;
        })
      );
      setGrid(newGrid);
    }
  };
 
//****************************Clear Grid*******************************//  
const clearGrid = () => {
    if (!isRunning) {
      const newGrid = grid.map((row) =>
        row.map((node) => {
          if (node.isStart || node.isFinish || node.isWall) {
            // Preserve start and finish nodes, but clear their properties
            return {
              ...node,
              isShortestPath: false,
              isVisited: false,
              distance: Infinity,
              previousNode: null,
            };
          } else {
            // Reset other nodes
            return createNode(node.col, node.row);
          }
        })
      );
      setGrid(newGrid);
    }
};
const resetGrid = () => {
  const newGrid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    newGrid.push(currentRow);
  }
  setGrid(newGrid);
};

//****************************Random Maze Generator*******************************//
const RandomMazeGenerator = () => {
  resetGrid();
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedWalls = randomMaze(grid, startNode, finishNode);
  animateWalls(visitedWalls);
}; 

const animateWalls = (visitedWalls) => {
  for (let i = 0; i < visitedWalls.length ;i++) {
    setTimeout(() => {
      const node = visitedWalls[i];
      setGrid(prevState => {
        const updatedWallGrid = prevState.map(row =>
          row.map(currNode =>
            currNode.row === node.row && currNode.col === node.col
              ? { ...currNode, isWall: true }
              : currNode
          )
        );
        return updatedWallGrid;
      });
    }, 10*i); 
  }
};
//****************************Horizontal Maze Generator*******************************//
const horizontalMazeGenerator = () => {
  // resetGrid();
  const visitedHorizontalWall = StairCaseMaze(grid);
  animateWalls(visitedHorizontalWall);
}; 
//****************************Horizontal Maze Generator*******************************//
const SimpleMazeGenerator = () => {
  // resetGrid();
  const simpleWall = SimpleMaze(grid);
  animateWalls(simpleWall);
}; 
return (
    <>
    <div className="buttons">
    <button onClick={SimpleMazeGenerator}>Simple Maze</button>
    <button onClick={RandomMazeGenerator}>Random Maze</button>
    <button onClick={horizontalMazeGenerator}>StairCase Maze</button>
    <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
    <button onClick={visualizeDFS}>Visualize DFS</button>
    <button onClick={visualizeBFS}>Visualize BFS</button>
    <button onClick={clearWalls}>Clear Walls</button>
    <button onClick={clearGrid}>Clear Grid</button>
    </div>
    <div className='grid'>
       {grid.map((row, rowIdx) =>(
        <div key={rowIdx} className="row">
          {row.map((node, nodeIdx) => {
            const { row, col, isWall, isStart, isFinish, isVisited, isShortestPath } = node;
            return (
                <Node
                key={nodeIdx}
                col={col}
                row={row}
                isShortestPath={isShortestPath}
                isVisited={isVisited}
                isFinish={isFinish}
                isStart={isStart}
                isWall={isWall}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={() => handleMouseDown(row, col)}
                onMouseEnter={() => handleMouseEnter(row, col)}
                onMouseUp={handleMouseUp}
              />
            );
          })}
        </div>
       ))} 
      
    </div>
    </>
  )
};


export default PathFinder
