export function dijkstra(grid, startNode, finishNode)
{
  if(!startNode || !finishNode || startNode === finishNode)
   return false;
//   start node distance is set to be zero bcz it is the starting point 
  startNode.distance =0;
// get all the nodes from the grid

 let unvisitedNodes = getAllNodes(grid);
 let visitedNodesInOrder = [];

while(unvisitedNodes.length !== 0)
{
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    
    // get the closest node
    let closestNode = unvisitedNodes.shift();
    
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(closestNode, grid);

}
}

function getAllNodes(grid) {
    let nodes = [];

    for (let row of grid) {
      for (let node of row) {
        nodes.push(node);
      }
    }
    return nodes;
} 
function updateUnvisitedNeighbours(node, grid) {
    let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  
    for (let unvisitedNeighbour of unvisitedNeighbours) {
      unvisitedNeighbour.distance = node.distance + 1;
      unvisitedNeighbour.previousNode = node;
    }
}
function getUnvisitedNeighbours(node, grid) {
    let neighbours = [];
    let { row, col } = node;

    if (row > 0) neighbours.push(grid[row - 1][col]);

    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  
    if (col > 0) neighbours.push(grid[row][col - 1]);
  
    return neighbours.filter((neighbour) => !neighbour.isVisited);
}
export function getNodesInShortestPathOrder(finishNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
  
    // Backtrack from the finish node to the start node
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  
  
  