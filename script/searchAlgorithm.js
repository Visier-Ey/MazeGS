// BFS Algorithm
async function BFS_Search() {
  find = false;
  let queue = new Queue();
  let current = Constant.start;
  let visited = new Array(Constant.row * Constant.col);
  queue.enqueue(current);
  maze[current.x][current.y].visited = true;
  var count = 0;
  while (queue.length() > 0) {
    count++;
    let current = queue.dequeue();
    let x = current.x;
    let y = current.y;
    if (FindPath && x == Constant.end.x && y == Constant.end.y) {
      alert("Path Found");
      find = true;
      break;
    }
    visited[x * Constant.col + y] = true;
    let directions = [];
    if (y - 1 >= 0 && !maze[x][y].top && !visited[x * Constant.col + y - 1])directions.push(0);
    if (x + 1 < Constant.row && !maze[x][y].right && !visited[(x + 1) * Constant.col + y])directions.push(1);
    if (y + 1 < Constant.col && !maze[x][y].bottom && !visited[x * Constant.col + y + 1])directions.push(2);
    if (x - 1 >= 0 && !maze[x][y].left && !visited[(x - 1) * Constant.col + y])directions.push(3);
    if (count % speed == 0) {
      await sleep(interval);
    }
    for (let direction of directions) {
      var cx = x;
      var cy = y;
      switch (direction) {
        case 0:
          cy = y - 1;
          break;
        case 1:
          cx = x + 1;
          break;
        case 2:
          cy = y + 1;
          break;
        case 3:
          cx = x - 1;
          break;
      }
      queue.enqueue({ x: cx, y: cy });
      visited[cx * Constant.col + cy] = true;
      drawPath(x, y, direction);
    }
  }
  if (FindPath && !find) {
    alert("No Path Found");
  }
  console.log("BFS Search");
}

async function DFS_Search() {
  let find = false;
  let visited = new Array(Constant.row * Constant.col);
  let mark = new Stack();
  var count = 0;
  async function DFS(x, y) {
    if (find || visited[x * Constant.col + y]) return;
    count++;
    visited[x * Constant.col + y] = true;
    if (FindPath && x == Constant.end.x && y == Constant.end.y) {
      drawMarkPath(mark);
      alert("Path Found");
      find = true;
      return;
    }
    let directions = [];
    if (y - 1 >= 0 && !maze[x][y].top && !visited[x * Constant.col + y - 1]) {
      directions.push([x, y - 1, 0]);
    }
    if (x + 1 < Constant.row &&!maze[x][y].right &&!visited[(x + 1) * Constant.col + y]) {
      directions.push([x + 1, y, 1]);
    }
    if (y + 1 < Constant.col &&!maze[x][y].bottom &&!visited[x * Constant.col + y + 1]) {
      directions.push([x, y + 1, 2]);
    }
    if (x - 1 >= 0 &&!maze[x][y].left &&!visited[(x - 1) * Constant.col + y]) {
      directions.push([x - 1, y, 3]);
    }
    for (let [nextX, nextY, direction] of directions) {
      if (find) return;
      mark.push({ x: x, y: y, direction: direction });
      if (count % speed == 0) {
        await sleep(interval);
      }
      drawPath(x, y, direction);
      await DFS(nextX, nextY);
      if (find) return;
      mark.pop();
    }
  }

  await DFS(Constant.start.x, Constant.start.y);
  if (FindPath && !find) {
    alert("No Path Found");
  }
  console.log("DFS Search");
}

// right hand rule
async function RightHand_Search() {
  let find = false;
  let time = 0;
  let current = {...Constant.start, direction: 1 };
  var count = 0;
  // no visited array, no need to check visited,when the robot goes back, it will not go back to the previous position
  // if arrived at the start position, it will stop
  while (true) {
    count++;
    let x = current.x;
    let y = current.y;
    if (x == Constant.start.x && y == Constant.start.y) {
      time++;
      if (time > 2) {
        if (FindPath) {
          alert("No Path Found");
        }
        break;
      }
    }
    if (FindPath && x == Constant.end.x && y == Constant.end.y) {
      find = true;
      break;
    }
    let direction = current.direction;
    let directions = [];
    if (direction == 0) {
      if (x - 1 >= 0 && !maze[x][y].left) directions.push(3);
      if (y - 1 >= 0 && !maze[x][y].top) directions.push(0);
      if (x + 1 < Constant.row && !maze[x][y].right) directions.push(1);
      if (y + 1 < Constant.col && !maze[x][y].bottom) directions.push(2);
    } else if (direction == 1) {
      if (y - 1 >= 0 && !maze[x][y].top) directions.push(0);
      if (x + 1 < Constant.row && !maze[x][y].right) directions.push(1);
      if (y + 1 < Constant.col && !maze[x][y].bottom) directions.push(2);
      if (x - 1 >= 0 && !maze[x][y].left) directions.push(3);
    } else if (direction == 2) {
      if (x + 1 < Constant.row && !maze[x][y].right) directions.push(1);
      if (y + 1 < Constant.col && !maze[x][y].bottom) directions.push(2);
      if (x - 1 >= 0 && !maze[x][y].left) directions.push(3);
      if (y - 1 >= 0 && !maze[x][y].top) directions.push(0);
    } else if (direction == 3) {
      if (y + 1 < Constant.col && !maze[x][y].bottom) directions.push(2);
      if (x - 1 >= 0 && !maze[x][y].left) directions.push(3);
      if (y - 1 >= 0 && !maze[x][y].top) directions.push(0);
      if (x + 1 < Constant.row && !maze[x][y].right) directions.push(1);
    }
    let next = false;
    var cx = x;
    var cy = y;
    for (let direction of directions) {
      if (next) break;
      switch (direction) {
        case 0:
          if (direction == 0) current.direction = 0;
          if (y - 1 >= 0 && !maze[x][y].top) {
            current.y = y - 1;
            next = true;
          }
          break;
        case 1:
          if (direction == 1) current.direction = 1;
          if (x + 1 < Constant.row && !maze[x][y].right) {
            current.x = x + 1;
            next = true;
          }
          break;
        case 2:
          if (direction == 2) current.direction = 2;
          if (y + 1 < Constant.col && !maze[x][y].bottom) {
            current.y = y + 1;
            next = true;
          }
          break;
        case 3:
          if (direction == 3) current.direction = 3;
          if (x - 1 >= 0 && !maze[x][y].left) {
            current.x = x - 1;
            next = true;
          }
          break;
      }
    }
    if (count % speed == 0) {
      await sleep(interval);
    }
    if (FindPath) markFindPath(x, y, current.direction);
    else drawPath(x, y, current.direction);
  }
  if (FindPath && find) {
    alert("Path Found");
  }
  console.log("Right Hand Search");
}
// Dijkstra's Algorithm
async function Dijkstra_Search() {
  let find = false;
  let minHeap = new MinHeap(a.distance < b.distance);
  let current = { ...Constant.start, distance: 0 };
  let visited = new Array(Constant.row * Constant.col);
  minHeap.enqueue(current);
  maze[current.x][current.y].visited = true;
  while (minHeap.length() > 0) {
    let current = minHeap.extractMin();
    let x = current.x;
    let y = current.y;
    visited[x * Constant.col + y] = true;
    if (FindPath && x == Constant.end.x && y == Constant.end.y) {
      alert("Path Found");
      find = true;
      break;
    }
    let directions = [];
    if (y - 1 >= 0 && !maze[x][y].top && !visited[x * Constant.col + y - 1])
      directions.push(0);
    if (
      x + 1 < Constant.row &&
      !maze[x][y].right &&
      !visited[(x + 1) * Constant.col + y]
    )
      directions.push(1);
    if (
      y + 1 < Constant.col &&
      !maze[x][y].bottom &&
      !visited[x * Constant.col + y + 1]
    )
      directions.push(2);
    if (x - 1 >= 0 && !maze[x][y].left && !visited[(x - 1) * Constant.col + y])
      directions.push(3);
    for (let direction of directions) {
      await sleep(interval);
      switch (direction) {
        case 0:
          if (!visited[x * Constant.col + y - 1]) {
            minHeap.insert({ x: x, y: y - 1, distance: current.distance + 5 });
            visited[x * Constant.col + y - 1] = true;
            drawPath(x, y, 0);
          }
          break;
        case 1:
          if (!visited[(x + 1) * Constant.col + y]) {
            minHeap.insert({ x: x + 1, y: y, distance: current.distance + 1 });
            visited[(x + 1) * Constant.col + y] = true;
            drawPath(x, y, 1);
          }
          break;
        case 2:
          if (!visited[x * Constant.col + y + 1]) {
            minHeap.insert({ x: x, y: y + 1, distance: current.distance + 1 });
            visited[x * Constant.col + y + 1] = true;
            drawPath(x, y, 2);
          }
          break;
        case 3:
          if (!visited[(x - 1) * Constant.col + y]) {
            minHeap.insert({ x: x - 1, y: y, distance: current.distance + 5 });
            visited[(x - 1) * Constant.col + y] = true;
            drawPath(x, y, 3);
          }
          break;
      }
    }
  }
  if (FindPath && !find) {
    alert("No Path Found");
  }
  console.log("Dijkstra Search");
}
// A* Algorithm
async function AStar_Search(chosen) {
  
  let find = false;
  let visited = new Array(Constant.row * Constant.col);
  let mark = new Stack();
  var count = 0;
  async function AStarDFS(x, y, distance) {
    if (find || visited[x * Constant.col + y]) return;
    visited[x * Constant.col + y] = true;
    if (FindPath && x == Constant.end.x && y == Constant.end.y) {
      alert("Path Found");
      drawMarkPath(mark);
      find = true;
      return;
    }
    count++;
    function heuristic(x, y) {
      return Math.abs(x - Constant.end.x) + Math.abs(y - Constant.end.y);
    }
  
    let neighbors = [];
    if (y - 1 >= 0 && !maze[x][y].top && !visited[x * Constant.col + y - 1])
      neighbors.push([x, y - 1, distance + Constant.distanceY, heuristic(x, y - 1), 0]);
    if (x + 1 < Constant.row && !maze[x][y].right && !visited[(x + 1) * Constant.col + y])
      neighbors.push([x + 1, y, distance + Constant.distanceX, heuristic(x + 1, y), 1]);
    if (y + 1 < Constant.col && !maze[x][y].bottom && !visited[x * Constant.col + y + 1])
      neighbors.push([x, y + 1, distance + Constant.distanceY, heuristic(x, y + 1), 2]);
    if (x - 1 >= 0 && !maze[x][y].left && !visited[(x - 1) * Constant.col + y])
      neighbors.push([x - 1, y, distance + Constant.distanceX, heuristic(x - 1, y), 3]);
  
    neighbors.sort((a, b) => a[2] + a[3] - (b[2] + b[3]));
  
      // different from DFS
    for (let neighbor of neighbors) {
      let [nx, ny, ndistance, , direction] = neighbor;
      mark.push({ x: x, y: y, direction: direction });
      if (count % speed == 0) {
        await sleep(interval);
      }
      drawPath(x, y, direction);
      await AStarDFS(nx, ny, ndistance);
      if (find) return;
      mark.pop();
    }
  }

  async function AStarBFS() {
    let minHeap = new Heap((a, b) => ( a.heuristic) < ( b.heuristic));
    let current = { ...Constant.start, distance: 0, heuristic: 0 };
    minHeap.insert(current);
    // await sleep(interval);
    maze[current.x][current.y].visited = true;
  
    function heuristic(x, y) {
      return Math.abs(x - Constant.end.x) + Math.abs(y - Constant.end.y);
    }
    
    while (minHeap.length() > 0) {
      // await sleep(10);
      let current = minHeap.extractMin();
      // await sleep(10);
      let x = current.x;
      let y = current.y;
      visited[x * Constant.col + y] = true;
      if (FindPath && x == Constant.end.x && y == Constant.end.y) {
        alert("Path Found");
        find = true;
        break;
      }
      count++;
      let directions = [];
      if (y - 1 >= 0 && !maze[x][y].top && !visited[x * Constant.col + y - 1])
        directions.push(0);
      if ( x + 1 < Constant.row &&!maze[x][y].right &&!visited[(x + 1) * Constant.col + y])
        directions.push(1);
      if (y + 1 < Constant.col &&!maze[x][y].bottom &&!visited[x * Constant.col + y + 1])
        directions.push(2);
      if (x - 1 >= 0 && !maze[x][y].left && !visited[(x - 1) * Constant.col + y])
        directions.push(3);
      if (count % speed == 0) {
        await sleep(interval);
      }
      for (let direction of directions) {
          let nx = x;
          let ny = y;
          switch (direction) {
            case 0:
              ny = y - 1;
              break;
            case 1:
              nx = x + 1;
              break;
            case 2:
              ny = y + 1;
              break;
            case 3:
              nx = x - 1;
              break;
          }
          if (!visited[nx * Constant.col + ny]) {
            minHeap.insert({
              x: nx,
              y: ny,
              distance: current.distance + (direction % 2 == 0 ? Constant.distanceY : Constant.distanceX),
              heuristic: heuristic(nx, ny),
            });
            visited[nx * Constant.col + ny] = true;
            drawPath(x, y, direction);
          }
      }
    }
  }
  
  if (!chosen) {
    await AStarDFS(Constant.start.x, Constant.start.y, 0);
  } else {
    await AStarBFS();
  }

  
  if (FindPath && !find) {
    alert("No Path Found");
  }
  console.log("A* Search");


}
