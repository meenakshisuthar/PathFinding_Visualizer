export function dijkstra(grid, startNode, finishNode)
{
  if(!startNode || !finishNode || startNode === finishNode)
   return false;
//   start node distance is set to be zero bcz it is the starting point 
  startNode.distance =0;
// get all the nodes from the grid

 let unvisitedNodes = getAllNodes(grid);

// Array to keep track of visited nodes in order
let visitedNodesInOrder = [];

while(unvisitedNodes.length !== 0)
{
    // Sort the unvisited nodes by their distance in ascending order
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    
    // get the closest node
    let closestNode = unvisitedNodes.shift();
     // If the closest node is a wall, skip it and continue to the next iteration
    if (closestNode.isWall) continue;
    // If the distance of the closest node is Infinity, it means it's not reachable
    // and there is no path to the finish node. So, we return the visited nodes in order.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;

    // Update the distances of the unvisited neighbors of the closestNode
    updateUnvisitedNeighbours(closestNode, grid);

}
}

function getAllNodes(grid) {
    let nodes = [];
  
    // Iterate over each row in the grid
    for (let row of grid) {
      // Iterate over each node in the current row
      for (let node of row) {
        // Add the node to the 'nodes' array
        nodes.push(node);
      }
    }
  
    // Return the array of all nodes in the grid
    return nodes;
} 
function updateUnvisitedNeighbours(node, grid) {
    // Get the unvisited neighbors of the current node using the getUnvisitedNeighbours function
    let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  
    // Iterate through the unvisited neighbors
    for (let unvisitedNeighbour of unvisitedNeighbours) {
      // Update the distance of the unvisited neighbor by adding 1 to the distance of the current node
      unvisitedNeighbour.distance = node.distance + 1;
  
      // Set the previousNode of the unvisited neighbor to the current node
      unvisitedNeighbour.previousNode = node;
    }
}
function getUnvisitedNeighbours(node, grid) {
    let neighbours = [];
    let { row, col } = node;
  
    // Check if the neighbor above the current node is unvisited and within the grid bounds
    if (row > 0) neighbours.push(grid[row - 1][col]);
  
    // Check if the neighbor to the right of the current node is unvisited and within the grid bounds
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  
    // Check if the neighbor below the current node is unvisited and within the grid bounds
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  
    // Check if the neighbor to the left of the current node is unvisited and within the grid bounds
    if (col > 0) neighbours.push(grid[row][col - 1]);
  
    // Filter out any neighbors that are already visited (i.e., not unvisited)
    return neighbours.filter((neighbour) => !neighbour.isVisited);
}
export function getNodesInShortestPathOrder(finishNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
  
    // Backtrack from the finish node to the start node
    while (currentNode !== null) {
      // Add the current node to the beginning of the array
      nodesInShortestPathOrder.unshift(currentNode);
      // Move to the previous node in the path
      currentNode = currentNode.previousNode;
    }
  
    // The array nodesInShortestPathOrder now contains the shortest path from start to finish
    return nodesInShortestPathOrder;
  }
  
  
  