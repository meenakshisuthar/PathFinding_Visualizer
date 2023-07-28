export function DFS(grid, startNode, finishNode)
{
    const visitedNodesInOrder = [];
    const nextNodesStack = [];
    nextNodesStack.push(startNode);
    while(nextNodesStack.length)
    {
        const currentNode = nextNodesStack.pop();
        if(currentNode === finishNode)
         return visitedNodesInOrder;
        if(!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) 
        {
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);

            const { col, row } = currentNode;
            const neighbors = [];
            
            // Check if the neighboring nodes are valid and not walls
            if (row > 0 && !grid[row - 1][col].isWall) {
                neighbors.push(grid[row - 1][col]);
            }
            if (row < grid.length - 1 && !grid[row + 1][col].isWall) {
                neighbors.push(grid[row + 1][col]);
            }
            if (col > 0 && !grid[row][col - 1].isWall) {
                neighbors.push(grid[row][col - 1]);
            }
            if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) {
                neighbors.push(grid[row][col + 1]);
            }
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited) {
                  neighbor.previousNode = currentNode;
                  nextNodesStack.push(neighbor);
                }    
            }
        }    
    }

}

