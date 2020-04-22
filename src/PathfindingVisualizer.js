import React, { Component } from 'react';
import Node from './Node';
import { BFS, getNodesInShortestPath } from './Algorithms/BFS';

import './PathfindingVisualizer.css';

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var END_NODE_ROW = 10;
var END_NODE_COL = 25;
var MOVE_START_NODE = 0;
var MOVE_END_NODE = 0;
var isVisualized = 0;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mousePressed: false,
        };
    }

    componentDidMount() {
        var grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        if((row !== START_NODE_ROW || col !== START_NODE_COL) && (row !== END_NODE_ROW || col !== END_NODE_COL)){
            if(isVisualized){
                var deVisualGrid = removeVisualization(this.state.grid);
                this.setState({grid: deVisualGrid});
            }
            var newGrid = getNewGrid(this.state.grid, row, col);
            this.setState({grid: newGrid});
        }
        else{
            if(row === START_NODE_ROW && col === START_NODE_COL){
                MOVE_START_NODE = 1;
            }
            else if(row === END_NODE_ROW && col === END_NODE_COL){
                MOVE_END_NODE = 1;
            }
        }
        this.setState({mousePressed: true});
    }

    handleMouseEnter(row, col) {
        if(!this.state.mousePressed) return;
        if(!MOVE_START_NODE && !MOVE_END_NODE && (row !== START_NODE_ROW || col !== START_NODE_COL) && (row !== END_NODE_ROW || col !== END_NODE_COL)){
            var newGrid = getNewGrid(this.state.grid, row, col);
            this.setState({grid: newGrid});
        }
        else{
            if(MOVE_START_NODE){
                START_NODE_ROW = row;
                START_NODE_COL = col;
                var updatedStartGrid = updateGrid(this.state.grid);
                this.setState({grid: updatedStartGrid});
            }
            else if(MOVE_END_NODE){
                END_NODE_ROW = row;
                END_NODE_COL = col;
                var updatedEndGrid = updateGrid(this.state.grid);
                this.setState({grid: updatedEndGrid});
            }
        }
    }

    handleMouseUp() {
        this.setState({mousePressed: false});
        MOVE_START_NODE = 0;
        MOVE_END_NODE = 0;
    }

    clearBoard = () => {
        var reset = getInitialGrid();
        this.setState({grid: reset});
        for(let row=0 ; row<20 ; ++row){
            for(let col=0 ; col<60 ; ++col){
                const node = this.state.grid[row][col];
                if(row === START_NODE_ROW && col === START_NODE_COL){
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-start';
                    continue;
                }
                if(row === END_NODE_ROW && col === END_NODE_COL){
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-end';
                    continue;
                }
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node';
            }
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0 ; i < nodesInShortestPathOrder.length - 1 ; i++) {
            if(i === 0)continue;
            setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 40 * i);
        }
    }
    
    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0 ; i <= visitedNodesInOrder.length ; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10*i);
                return;
            }

            if(i === 0 || i === visitedNodesInOrder.length)continue;
            setTimeout(() => {
                var node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10*i);
        }
    }
    
    visualiseBFS = () => {
        if(isVisualized){
            var deVisualGrid = removeVisualization(this.state.grid);
            this.setState({grid: deVisualGrid});
        }
        var {grid} = this.state;
        var startNode = grid[START_NODE_ROW][START_NODE_COL];
        var endNode = grid[END_NODE_ROW][END_NODE_COL];
        var visitedNodesInOrder = BFS(grid, startNode, endNode);
        console.log(visitedNodesInOrder.length);
        var nodesInShortestPath = getNodesInShortestPath(endNode);
        console.log(nodesInShortestPath.length);
        this.animateBFS(visitedNodesInOrder, nodesInShortestPath);
        isVisualized = 1;
    }

    render() {
        const {grid, mousePressed} = this.state;
        
        return (
            <>
                <div classname="legend">
                    <button onClick={() => this.visualiseBFS()}>
                        Visualize BFS
                    </button>
                    <button onClick={() => this.clearBoard()}>
                        Clear Board
                    </button>
                    <div>
                    <p>Start Node is marked green.End Node is marked red.<br />You can move around the start and end node by just dragging them.Walls can be created by clicking on empty cells.
                    </p>
                    </div>
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isEnd, isStart, isWall} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isEnd={isEnd}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mousePressed={mousePressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}></Node>
                                    );
                                })
                                }
                            </div>
                        );
                    })
                    }
                </div>
            </>
        );
    }
}

var getInitialGrid = () => {
    START_NODE_ROW = 10;
    START_NODE_COL = 15;
    END_NODE_ROW = 10;
    END_NODE_COL = 25;
    var grid = [];
    for(var row=0 ; row<20 ; ++row){
        var currnetRow = [];
        for(var col=0 ; col<60 ; ++col){
            currnetRow.push(createNode(row, col));
        }
        grid.push(currnetRow);
    }

    return grid;
};

var createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isEnd: row === END_NODE_ROW && col === END_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

var getNewGrid = (grid, row, col) => {
    var newGrid = grid.slice();
    var node = newGrid[row][col];
    var newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;

    return newGrid;
};

var updateGrid = (grid) => {
    var updatedGrid = grid.slice();
    for(var row=0 ; row<20 ; ++row){
        for(var col=0 ; col<60 ; ++col){
            updatedGrid[row][col].isVisited = false;
            updatedGrid[row][col].distance = Infinity;
            updatedGrid[row][col].previousNode = null;
            if(row === START_NODE_ROW && col === START_NODE_COL){
                updatedGrid[row][col].isStart = true;
                updatedGrid[row][col].isWall = false;
            }
            else if(row === END_NODE_ROW && col === END_NODE_COL){
                updatedGrid[row][col].isEnd = true;
                updatedGrid[row][col].isWall = false
            }
            else{
                updatedGrid[row][col].isStart = false;
                updatedGrid[row][col].isEnd = false;
            }
            if(isVisualized){
                if(document.getElementById(`node-${row}-${col}`).className ==='node node-shortest-path' || document.getElementById(`node-${row}-${col}`).className ==='node node-visited'){
                    document.getElementById(`node-${row}-${col}`).className = 'node';
                }
            }
        }
    }

    isVisualized = 0;

    return updatedGrid;
}

var removeVisualization = (grid) => {
    var deVisualGrid = grid.slice();
    for(let row=0 ; row<20 ; ++row){
        for(let col=0 ; col<60 ; ++col){
            deVisualGrid[row][col].isVisited = false;
            deVisualGrid[row][col].distance = Infinity;
            deVisualGrid[row][col].previousNode = null;
            if(document.getElementById(`node-${row}-${col}`).className ==='node node-shortest-path' || document.getElementById(`node-${row}-${col}`).className ==='node node-visited'){
                document.getElementById(`node-${row}-${col}`).className = 'node';
            }
        }
    }
    return deVisualGrid;
}