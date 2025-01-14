// Description: This file contains the auxilary functions for the maze generation and solving algorithms.
// auxilary function

function drawLine(x, y, direction) {
  ctx.fillStyle = "#000000";
  switch (direction) {
    case 0:
      ctx.beginPath();
      ctx.moveTo(x * Constant.cellWidth, y * Constant.cellHeight);
      ctx.lineTo(
        x * Constant.cellWidth + Constant.cellWidth,
        y * Constant.cellHeight
      );
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(
        x * Constant.cellWidth + Constant.cellWidth,
        y * Constant.cellHeight
      );
      ctx.lineTo(
        x * Constant.cellWidth + Constant.cellWidth,
        y * Constant.cellHeight + Constant.cellHeight
      );
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(
        x * Constant.cellWidth + Constant.cellWidth,
        y * Constant.cellHeight + Constant.cellHeight
      );
      ctx.lineTo(
        x * Constant.cellWidth,
        y * Constant.cellHeight + Constant.cellHeight
      );
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(
        x * Constant.cellWidth,
        y * Constant.cellHeight + Constant.cellHeight
      );
      ctx.lineTo(x * Constant.cellWidth, y * Constant.cellHeight);
      ctx.stroke();
      break;
  }
}
function drawPath(x, y, direction) {
  ctx.fillStyle = "#FF0000";
  const halfWidth = Constant.cellWidth / 2;
  const halfHeight = Constant.cellHeight / 2;
  const lineWidth = parseInt(Constant.cellWidth / 5);
  const halfLineWidth = parseInt(lineWidth / 2);
  switch (direction) {
    case 0:
      ctx.fillRect(
        x * Constant.cellWidth + halfWidth - halfLineWidth,
        y * Constant.cellHeight - halfHeight + halfLineWidth,
        lineWidth,
        Constant.cellHeight
      );
      break;
    case 1:
      ctx.fillRect(
        x * Constant.cellWidth + halfWidth - halfLineWidth,
        y * Constant.cellHeight + halfHeight - halfLineWidth,
        Constant.cellWidth,
        lineWidth
      );
      break;
    case 2:
      ctx.fillRect(
        x * Constant.cellWidth + halfWidth - halfLineWidth,
        y * Constant.cellHeight + halfHeight - halfLineWidth,
        lineWidth,
        Constant.cellHeight
      );
      break;
    case 3:
      ctx.fillRect(
        x * Constant.cellWidth - halfWidth + halfLineWidth,
        y * Constant.cellHeight + halfHeight - halfLineWidth,
        Constant.cellWidth,
        lineWidth
      );
      break;
  }
}
function markFindPath(x, y, direction) {
  ctx.fillStyle = "#00FF00";
  const halfWidth = Constant.cellWidth / 2;
  const halfHeight = Constant.cellHeight / 2;
  const lineWidth = parseInt(Constant.cellWidth / 5);
  const halfLineWidth = parseInt(lineWidth / 2);
  switch (direction) {
    case 0:
      ctx.fillRect(
        x * Constant.cellWidth + halfWidth - halfLineWidth,
        y * Constant.cellHeight - halfHeight + halfLineWidth,
        lineWidth,
        Constant.cellHeight
      );
      break;
    case 1:
      ctx.fillRect(
        x * Constant.cellWidth + halfWidth - halfLineWidth,
        y * Constant.cellHeight + halfHeight - halfLineWidth,
        Constant.cellWidth,
        lineWidth
      );
      break;
    case 2:
      ctx.fillRect(
        x * Constant.cellWidth + halfWidth - halfLineWidth,
        y * Constant.cellHeight + halfHeight - halfLineWidth,
        lineWidth,
        Constant.cellHeight
      );
      break;
    case 3:
      ctx.fillRect(
        x * Constant.cellWidth - halfWidth + halfLineWidth,
        y * Constant.cellHeight + halfHeight - halfLineWidth,
        Constant.cellWidth,
        lineWidth
      );
      break;
  }
}
function drawMarkPath(markStack) {
  current = markStack.pop();
  while (current) {
    markFindPath(current.x, current.y, current.direction);
    current = markStack.pop();
  }
}
// 0: top, 1: right, 2: bottom, 3: left
function clearWall(x, y, direction) {
  switch (direction) {
    case 0:
      ctx.clearRect(
        x * Constant.cellWidth + 1,
        y * Constant.cellHeight - 1,
        Constant.cellWidth - 1,
        2
      );
      break;
    case 1:
      ctx.clearRect(
        (x + 1) * Constant.cellWidth - 1,
        y * Constant.cellHeight + 1,
        2,
        Constant.cellHeight - 1
      );
      break;
    case 2:
      ctx.clearRect(
        x * Constant.cellWidth + 1,
        (y + 1) * Constant.cellHeight - 1,
        Constant.cellWidth - 1,
        2
      );
      break;
    case 3:
      ctx.clearRect(
        x * Constant.cellWidth - 1,
        y * Constant.cellHeight + 1,
        2,
        Constant.cellHeight - 1
      );
      break;
  }
}
function eminateWall(x, y, direction) {
  switch (direction) {
    case 0:
      maze[x][y].top = false;
      maze[x][y - 1].bottom = false;
      clearWall(x, y, 0);
      break;
    case 1:
      maze[x][y].right = false;
      maze[x + 1][y].left = false;
      clearWall(x, y, 1);
      break;
    case 2:
      maze[x][y].bottom = false;
      maze[x][y + 1].top = false;
      clearWall(x, y, 2);
      break;
    case 3:
      maze[x][y].left = false;
      maze[x - 1][y].right = false;
      clearWall(x, y, 3);
      break;
  }
}
function sleep(ms) {
  if (ms === 0) {
    return 0;
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateWall(x, y, direction) {
  switch (direction) {
    case 0:
      maze[x][y].top = true;
      maze[x][y - 1].bottom = true;
      drawLine(x, y, 0);
      break;
    case 1:
      maze[x][y].right = true;
      maze[x + 1][y].left = true;
      drawLine(x, y, 1);
      break;
    case 2:
      maze[x][y].bottom = true;
      maze[x][y + 1].top = true;
      drawLine(x, y, 2);
      break;
    case 3:
      maze[x][y].left = true;
      maze[x - 1][y].right = true;
      drawLine(x, y, 3);
      break;
  }
}

function clearMaze() {
  ctx.clearRect(0, 0, Constant.width, Constant.height);
  maze = new Array(Constant.row);
  for (let i = 0; i < Constant.row; i++) {
    // each row has how many cols
    maze[i] = new Array(Constant.col);
    for (let j = 0; j < Constant.col; j++) {
      maze[i][j] = {
        top: false,
        right: false,
        bottom: false,
        left: false,
        visited: false,
      };
    }
  }
  // set border
    for (let i = 0; i < Constant.row; i++) {
        maze[i][0].top = true;
        maze[i][Constant.col - 1].bottom = true;
    }
    for (let i = 0; i < Constant.col; i++) {
        maze[0][i].left = true;
        maze[Constant.row - 1][i].right = true;
    }
    recorverMaze();
}

function init_maze() {
  maze = new Array(Constant.row);
  for (let i = 0; i < Constant.row; i++) {
    // each row has how many cols
    maze[i] = new Array(Constant.col);
    for (let j = 0; j < Constant.col; j++) {
      maze[i][j] = {
        top: true,
        right: true,
        bottom: true,
        left: true,
        visited: false,
      };
    }
  }
  drawMaze();
}

function drawMaze() {
  //clear the canvas
  ctx.clearRect(0, 0, Constant.width, Constant.height);
  //drawLine
  for (let i = 0; i < Constant.col + 1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * Constant.cellHeight);
    ctx.lineTo(Constant.row * Constant.cellWidth, i * Constant.cellHeight);
    ctx.stroke();
  }
  for (let i = 0; i < Constant.row + 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * Constant.cellWidth, 0);
    ctx.lineTo(i * Constant.cellWidth, Constant.col * Constant.cellHeight);
    ctx.stroke();
  }
  //draw start and end
  drawStartAndEnd();
}

function drawStartAndEnd() {
  ctx.fillStyle = "blue";
  ctx.fillRect(
    Constant.start.x * Constant.cellWidth,
    Constant.start.y * Constant.cellHeight,
    Constant.cellWidth,
    Constant.cellHeight
  );
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    Constant.end.x * Constant.cellWidth,
    Constant.end.y * Constant.cellHeight,
    Constant.cellWidth,
    Constant.cellHeight
  );
}

function setRow(row) {
  console.log(Constant.height);
  console.log(Constant.width);
  console.log(row);
  Constant.row = row;
  minWidth =
    Constant.width / Constant.row < Constant.height / Constant.col
      ? Constant.width / Constant.row
      : Constant.height / Constant.col;
  Constant.cellWidth = minWidth;
  Constant.cellHeight = minWidth;
  console.log(minWidth);
  Constant.end.x = row - 1;
  document.getElementById("Row").value = Constant.row;
  document.getElementById(
    "End"
  ).value = `[${Constant.end.x},${Constant.end.y}]`;
}
function setCol(col) {
  Constant.col = col;
  minWidth =
    Constant.width / Constant.row < Constant.height / Constant.col
      ? Constant.width / Constant.row
      : Constant.height / Constant.col;
  Constant.cellWidth = minWidth;
  Constant.cellHeight = minWidth;
  Constant.end.y = col - 1;
  document.getElementById("Col").value = Constant.col;
  document.getElementById(
    "End"
  ).value = `[${Constant.end.x},${Constant.end.y}]`;
}

function GlobalInit() {
  optionList = {
    maze: {
      label: "Maze",
      instance: document.getElementById("MazeLabel"),
    },
    generateAlgorithm: {
      label: "Generate Algorithm",
      instance: document.getElementById("GenerateAlgorithm"),
      options: [
        {
          label: "DFS Algorithm",
          instance: document.getElementById("DFS_Generate"),
        },
        {
          label: "Recursive Backtracker",
          instance: document.getElementById("Recur_Generate"),
        },
        {
          label: "Prim's Algorithm",
          instance: document.getElementById("Prim_Generate"),
        },
        {
          label: "Kruskal's Algorithm",
          instance: document.getElementById("Kruskal_Generate"),
        },
      ],
    },
    searchAlgorithm: {
      label: "Search Algorithm",
      instance: document.getElementById("SearchAlgorithm"),
      options: [
        {
          label: "BFS Algorithm",
          instance: document.getElementById("BFS_Search"),
        },
        {
          label: "DFS Algorithm",
          instance: document.getElementById("DFS_Search"),
        },
        {
          label: "Right Hand Rule",
          instance: document.getElementById("RightHand_Search"),
        },
        {
          label: "Dijkstra's Algorithm",
          instance: document.getElementById("Dijkstra_Search"),
        },
        {
          label: "A* Algorithm DFS",
          instance: document.getElementById("Astar_SearchDFS"),
        },
        {
          label: "A* Algorithm BFS",
          instance: document.getElementById("Astar_SearchBFS"),
        },
      ],
    },
    setting: {
      label: "Setting",
      instance: document.getElementById("SettingLabel"),
    },
    customMaze: {
      label: "Custom Maze",
      instance: document.getElementById("CustomMazeLabel"),
    },
  };

  screens = {
    maze: document.getElementById("screenMaze"),
    setting: document.getElementById("screenMazeSetting"),
    customMaze: document.getElementById("screenCustomMaze"),
  };
  canvas = document.querySelector(".MazeCanvas");
  ctx = canvas.getContext("2d");
  //test constant
  interval = 1;
  speed = 4;
  row = 100;
  col = 100;
  minWidth =
    parseFloat(getComputedStyle(canvas).width.split("px")[0]) / row <
    parseFloat(getComputedStyle(canvas).height.split("px")[0]) / col
      ? parseFloat(getComputedStyle(canvas).width.split("px")[0]) / row
      : parseFloat(getComputedStyle(canvas).height.split("px")[0]) / col;
  Constant = {
    row: row,
    col: col,
    width: parseFloat(getComputedStyle(canvas).width.split("px")[0]),
    height: parseFloat(getComputedStyle(canvas).height.split("px")[0]),
    cellWidth: minWidth,
    cellHeight: minWidth,
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: row - 1,
      y: col - 1,
    },
    distanceX: 1,
    distanceY: 1,
  };

  (function canvasInit() {
    canvas.width = Constant.width;
    canvas.height = Constant.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Constant.width * dpr;
    canvas.height = Constant.height * dpr;
    ctx.scale(dpr, dpr);
    document.getElementById("Start").value = `[0,0]`;
    document.getElementById("End").value = `[${col - 1},${row - 1}]`;
    document.getElementById("Row").value = row;
    document.getElementById("Col").value = col;
  })();
}

function clearPath() {
  drawMaze();
}

function drawWall(x, y, direction) {
  switch (direction) {
    case 0:
      ctx.fillRect(
        x * Constant.cellWidth,
        y * Constant.cellHeight,
        Constant.cellWidth,
        2
      );
      break;
    case 1:
      ctx.fillRect(
        (x + 1) * Constant.cellWidth - 2,
        y * Constant.cellHeight,
        2,
        Constant.cellHeight
      );
      break;
    case 2:
      ctx.fillRect(
        x * Constant.cellWidth,
        (y + 1) * Constant.cellHeight - 2,
        Constant.cellWidth,
        2
      );
      break;
    case 3:
      ctx.fillRect(
        x * Constant.cellWidth,
        y * Constant.cellHeight,
        2,
        Constant.cellHeight
      );
      break;
  }
}

function recorverMaze(x, y) {
  // draw wall from maze
  ctx.clearRect(0, 0, Constant.width, Constant.height);
  drawStartAndEnd();
  ctx.fillStyle = "black";
  for (let i = 0; i < Constant.row; i++) {
    for (let j = 0; j < Constant.col; j++) {
      if (maze[i][j].top) {
        drawLine(i, j, 0);
      }
      if (maze[i][j].right) {
        drawLine(i, j, 1);
      }
      if (maze[i][j].bottom) {
        drawLine(i, j, 2);
      }
      if (maze[i][j].left) {
        drawLine(i, j, 3);
      }
    }
  }
}

function switchToMaze() {
  screens.maze.classList.add("screenShow");
  screens.customMaze.classList.remove("screenShow");
}

function switchToSetting() {
  // screens.setting.classList.add("screenShow");
  // screens.maze.classList.remove("screenShow");
  document.getElementById("AsideRight").classList.toggle("collapse");
}

function switchToCustomMaze() {
  screens.customMaze.classList.add("screenShow");
  screens.maze.classList.remove("screenShow");
}

function setStartEnd(start, end) {
  Constant.start = start;
  Constant.end = end;
  document.getElementById("Start").value = `[${start.x},${start.y}]`;
  document.getElementById("End").value = `[${end.x},${end.y}]`;
  recorverMaze();
  switchToMaze();
}

function setSpeed(sp) {
    speed = sp*5;
    document.getElementById("Speed").value = sp;
}

function analysisText(userInput) {
  // console.log(userInput);
  var lines = userInput.split("\n");
  // return AdjMatrix
  var adjMatrix = [];
  var numCols = lines[0].split(" ").length;
  for (var i = 0; i < lines.length; i++) {
    var adjLine = [];
    var line = lines[i].split(" ");
    if (line.length !== numCols) {
      alert("Inconsistent number of columns detected in line " + (i + 1));
      return;
    }
    for (var j = 0; j < line.length; j++) {
      var num = parseInt(line[j]);
      if (isNaN(num)) {
        alert("Invalid input detected: " + line[j]);
        return;
      }
      adjLine.push(num);
    }
    adjMatrix.push(adjLine);
  }
  alert("Analysis complete");
  // console.log(adjMatrix);
  return adjMatrix;
}

function transposedMatrix(matrix) {
  // covert col and row
  var transposedMatrix = [];
  for (var i = 0; i < matrix[0].length; i++) {
    transposedMatrix[i] = [];
    for (var j = 0; j < matrix.length; j++) {
      transposedMatrix[i][j] = matrix[j][i];
    }
  }
  return transposedMatrix;
}

function convertAdjMatrixToMaze(adjMatrix) {
  // convert adjMatrix to maze
  adjMatrix = transposedMatrix(adjMatrix);
  console.log(adjMatrix);
  var maze = new Array(adjMatrix.length);
  for (var i = 0; i < adjMatrix.length; i++) {
    maze[i] = new Array(adjMatrix[i].length);
    for (var j = 0; j < adjMatrix[i].length; j++) {
      maze[i][j] = {
        top: true,
        right: true,
        bottom: true,
        left: true,
        visited: false,
      };
    }
  }
  // 0 means no wall, 1 means wall
  for (var i = 0; i < adjMatrix.length; i++) {
    for (var j = 0; j < adjMatrix[i].length; j++) {
      let ci = i;
      let cj = j;
      if (adjMatrix[i][j] === 1) {
        continue;
      }
      try {
        if (adjMatrix[i][j] === 0) {
         
          if (adjMatrix[i - 1][j] === 0) {
            maze[ci][cj].left = false;
            maze[ci - 1][cj].right = false;
          }
          if (adjMatrix[i][j + 1] === 0) {
            maze[ci][cj].bottom = false;
            maze[ci][cj + 1].top = false;
          }
          if (adjMatrix[i + 1][j] === 0) {
            maze[ci][cj].right = false;
            maze[ci + 1][cj].left = false;
          }
          if (adjMatrix[i][j - 1] === 0) {
            maze[ci][cj].top = false;
            maze[ci][cj - 1].bottom = false;
          }
          
        }
      } catch (e) {
        console.log(e);
      }
      
    }
  }
  // console.log(maze);
  setCol(adjMatrix[0].length);
  setRow(adjMatrix.length);
  return maze;
}

function analysisJSON(json) {
  var obj = JSON.parse(json);
  var adjMatrix = obj.maze;
  var start = obj.start;
  var end = obj.end;
  var matrixString = "";
  for (var i = 0; i < adjMatrix.length; i++) {
    for (var j = 0; j < adjMatrix[i].length; j++) {
      matrixString += adjMatrix[i][j] + " ";
    }
    matrixString = matrixString.trim();
    matrixString += "\n";
  }
  matrixString = matrixString.trim();
  maze = convertAdjMatrixToMaze(analysisText(matrixString));
  setStartEnd(start, end);
}
