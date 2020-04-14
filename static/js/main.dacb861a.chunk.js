(this["webpackJsonppathfinding-visualizer"]=this["webpackJsonppathfinding-visualizer"]||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(6),i=n.n(r),s=(n(13),n(7)),c=n(1),l=n(2),d=n(3),u=n(4),m=(n(14),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,o=e.isStart,r=e.isEnd,i=e.isWall,s=e.onMouseDown,c=e.onMouseEnter,l=e.onMouseUp,d=r?"node-end":o?"node-start":i?"node-wall":"node";return a.a.createElement("div",{id:"node-".concat(t,"-").concat(n),className:"node ".concat(d),onMouseDown:function(){return s(t,n)},onMouseEnter:function(){return c(t,n)},onMouseUp:function(){return l()}})}}]),n}(o.Component));n(15);var v=10,f=15,h=10,g=25,w=0,p=0,E=0,y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).clearBoard=function(){var t=S();e.setState({grid:t});for(var n=0;n<20;++n)for(var o=0;o<60;++o){var a=e.state.grid[n][o];n!==v||o!==f?document.getElementById("node-".concat(a.row,"-").concat(a.col)).className=n!==h||o!==g?"node":"node node-end":document.getElementById("node-".concat(a.row,"-").concat(a.col)).className="node node-start"}},e.visualiseBFS=function(){if(E){var t=k(e.state.grid);e.setState({grid:t})}var n=e.state.grid,o=n[v][f],a=n[h][g],r=function(e,t,n){var o=[];t.distance=0;var a=e.slice(),r=[];for(r.push(t);r.length;){var i=r[0];if(r.shift(),!i.isVisited){if(console.log(i.isVisited),console.log(i.row+" "+i.col),i.isEnd)return o;o.push(i),a[i.row][i.col].isVisited=!0,i.col<59&&!a[i.row][i.col+1].isVisited&&!a[i.row][i.col+1].isWall&&(a[i.row][i.col+1].distance=i.distance+1,a[i.row][i.col+1].previousNode=i,r.push(a[i.row][i.col+1])),i.row>0&&!a[i.row-1][i.col].isVisited&&!a[i.row-1][i.col].isWall&&(a[i.row-1][i.col].distance=i.distance+1,a[i.row-1][i.col].previousNode=i,r.push(a[i.row-1][i.col])),i.col>0&&!a[i.row][i.col-1].isVisited&&!a[i.row][i.col-1].isWall&&(a[i.row][i.col-1].distance=i.distance+1,a[i.row][i.col-1].previousNode=i,r.push(a[i.row][i.col-1])),i.row<19&&!a[i.row+1][i.col].isVisited&&!a[i.row+1][i.col].isWall&&(a[i.row+1][i.col].distance=i.distance+1,a[i.row+1][i.col].previousNode=i,r.push(a[i.row+1][i.col]))}}return o}(n,o);console.log(r.length);var i=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(a);console.log(i.length),e.animateBFS(r,i),E=1},e.state={grid:[],mousePressed:!1},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=S();this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){if(e===v&&t===f||e===h&&t===g)e===v&&t===f?w=1:e===h&&t===g&&(p=1);else{if(E){var n=k(this.state.grid);this.setState({grid:n})}var o=b(this.state.grid,e,t);this.setState({grid:o})}this.setState({mousePressed:!0})}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mousePressed)if(w||p||e===v&&t===f||e===h&&t===g){if(w){v=e,f=t;var n=B(this.state.grid);this.setState({grid:n})}else if(p){h=e,g=t;var o=B(this.state.grid);this.setState({grid:o})}}else{var a=b(this.state.grid,e,t);this.setState({grid:a})}}},{key:"handleMouseUp",value:function(){this.setState({mousePressed:!1}),w=0,p=0}},{key:"animateShortestPath",value:function(e){for(var t=function(t){if(0===t)return"continue";setTimeout((function(){var n=e[t];document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest-path"}),40*t)},n=0;n<e.length-1;n++)t(n)}},{key:"animateBFS",value:function(e,t){for(var n=this,o=function(o){return o===e.length?(setTimeout((function(){n.animateShortestPath(t)}),10*o),{v:void 0}):0===o||o===e.length?"continue":void setTimeout((function(){var t=e[o];document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited"}),10*o)},a=0;a<=e.length;a++){var r=o(a);switch(r){case"continue":continue;default:if("object"===typeof r)return r.v}}}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,o=t.mousePressed;return a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{onClick:function(){return e.visualiseBFS()}},"Visualize BFS"),a.a.createElement("button",{onClick:function(){return e.clearBoard()}},"Clear Board"),a.a.createElement("div",null,a.a.createElement("p",null,a.a.createElement("br",null),"Start Node is marked green.",a.a.createElement("br",null),"End Node is marked red",a.a.createElement("br",null),"You can move around the start and end node by just dragging them.",a.a.createElement("br",null),"Walls can be created by clicking on empty cells.")),a.a.createElement("div",{className:"grid"},n.map((function(t,n){return a.a.createElement("div",{key:n},t.map((function(t,n){var r=t.row,i=t.col,s=t.isEnd,c=t.isStart,l=t.isWall;return a.a.createElement(m,{key:n,col:i,isEnd:s,isStart:c,isWall:l,mousePressed:o,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()},row:r})})))}))))}}]),n}(o.Component),S=function(){v=10,f=15,h=10,g=25;for(var e=[],t=0;t<20;++t){for(var n=[],o=0;o<60;++o)n.push(N(t,o));e.push(n)}return e},N=function(e,t){return{row:e,col:t,isStart:e===v&&t===f,isEnd:e===h&&t===g,distance:1/0,isVisited:!1,isWall:!1,previousNode:null}},b=function(e,t,n){var o=e.slice(),a=o[t][n],r=Object(s.a)({},a,{isWall:!a.isWall});return o[t][n]=r,o},B=function(e){for(var t=e.slice(),n=0;n<20;++n)for(var o=0;o<60;++o)t[n][o].isVisited=!1,t[n][o].distance=1/0,t[n][o].previousNode=null,n===v&&o===f?(t[n][o].isStart=!0,t[n][o].isWall=!1):n===h&&o===g?(t[n][o].isEnd=!0,t[n][o].isWall=!1):(t[n][o].isStart=!1,t[n][o].isEnd=!1),E&&("node node-shortest-path"!==document.getElementById("node-".concat(n,"-").concat(o)).className&&"node node-visited"!==document.getElementById("node-".concat(n,"-").concat(o)).className||(document.getElementById("node-".concat(n,"-").concat(o)).className="node"));return E=0,t},k=function(e){for(var t=e.slice(),n=0;n<20;++n)for(var o=0;o<60;++o)t[n][o].isVisited=!1,t[n][o].distance=1/0,t[n][o].previousNode=null,"node node-shortest-path"!==document.getElementById("node-".concat(n,"-").concat(o)).className&&"node node-visited"!==document.getElementById("node-".concat(n,"-").concat(o)).className||(document.getElementById("node-".concat(n,"-").concat(o)).className="node");return t};var M=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.dacb861a.chunk.js.map