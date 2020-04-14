export function BFS(grid, startNode, endNode) {
    var visitedNodesInOrder = [];
    startNode.distance = 0;
    var unvisitedNodes = grid.slice();
    var q = [];
    q.push(startNode);
    while(q.length){
        var currNode = q[0];
        q.shift();
        if(currNode.isVisited) continue;
        console.log(currNode.isVisited);
        console.log(currNode.row + " " + currNode.col);
        if(currNode.isEnd) return visitedNodesInOrder;
        visitedNodesInOrder.push(currNode);
        unvisitedNodes[currNode.row][currNode.col].isVisited = true;

        if(currNode.col < 59 && !unvisitedNodes[currNode.row][currNode.col+1].isVisited && !unvisitedNodes[currNode.row][currNode.col+1].isWall){
            unvisitedNodes[currNode.row][currNode.col+1].distance = currNode.distance + 1;
            unvisitedNodes[currNode.row][currNode.col+1].previousNode = currNode;
            q.push(unvisitedNodes[currNode.row][currNode.col+1]);
        }

        if(currNode.row > 0 && !unvisitedNodes[currNode.row-1][currNode.col].isVisited && !unvisitedNodes[currNode.row-1][currNode.col].isWall){
            unvisitedNodes[currNode.row-1][currNode.col].distance = currNode.distance + 1;
            unvisitedNodes[currNode.row-1][currNode.col].previousNode = currNode;
            q.push(unvisitedNodes[currNode.row-1][currNode.col]);
        }

        if(currNode.col > 0 && !unvisitedNodes[currNode.row][currNode.col-1].isVisited && !unvisitedNodes[currNode.row][currNode.col-1].isWall){
            unvisitedNodes[currNode.row][currNode.col-1].distance = currNode.distance + 1;
            unvisitedNodes[currNode.row][currNode.col-1].previousNode = currNode;
            q.push(unvisitedNodes[currNode.row][currNode.col-1]);
        }

        if(currNode.row < 19 && !unvisitedNodes[currNode.row+1][currNode.col].isVisited && !unvisitedNodes[currNode.row+1][currNode.col].isWall){
            unvisitedNodes[currNode.row+1][currNode.col].distance = currNode.distance + 1;
            unvisitedNodes[currNode.row+1][currNode.col].previousNode = currNode;
            q.push(unvisitedNodes[currNode.row+1][currNode.col]);
        }
    }

    return visitedNodesInOrder;
}

export function getNodesInShortestPath(endNode) {
    const nodesInShortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return nodesInShortestPath;
}