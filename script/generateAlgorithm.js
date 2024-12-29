// description: generate maze using different algorithms
async function DFS_Generate() {
  let stack = new Stack();
  let current = { x: 0, y: 0 };
  stack.push(current);
  maze[current.x][current.y].visited = true;
  var count = 0;
  while (stack.length() > 0) {
    let x = current.x;
    let y = current.y;
    let neighbors = [];

    if (y - 1 >= 0 && !maze[x][y - 1].visited) neighbors.push(0);
    if (x + 1 < Constant.row && !maze[x + 1][y].visited) neighbors.push(1);
    if (y + 1 < Constant.col && !maze[x][y + 1].visited) neighbors.push(2);
    if (x - 1 >= 0 && !maze[x - 1][y].visited) neighbors.push(3);

    if (neighbors.length > 0) {
      var cx = x;
      var cy = y;
      let direction = neighbors[Math.floor(Math.random() * neighbors.length)];
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
      eminateWall(x, y, direction);
      current = { x: cx, y: cy };
      stack.push(current);
      maze[current.x][current.y].visited = true;
      count++;
      if (count % speed == 0) {
        await sleep(interval);
      }
    } else {
      current = stack.pop();
    }
  }
  console.log("DFS");
}
// prim's algorithm
async function Prim_Generate() {
  // eminate neighbors
  let neighbors = [];
  let current = { x: 0, y: 0 };
  maze[current.x][current.y].visited = true;
  function addNeighbors(x, y) {
    if (y - 1 >= 0 && !maze[x][y - 1].visited)
      neighbors.push({ x: x, y: y - 1, direction: 0 });
    if (x + 1 < Constant.row && !maze[x + 1][y].visited)
      neighbors.push({ x: x + 1, y: y, direction: 1 });
    if (y + 1 < Constant.col && !maze[x][y + 1].visited)
      neighbors.push({ x: x, y: y + 1, direction: 2 });
    if (x - 1 >= 0 && !maze[x - 1][y].visited)
      neighbors.push({ x: x - 1, y: y, direction: 3 });
  }

  addNeighbors(current.x, current.y);
  var count = 0;
  while (neighbors.length > 0) {
    let randomIndex = Math.floor(Math.random() * neighbors.length);
    let next = neighbors.splice(randomIndex, 1)[0];

    if (!maze[next.x][next.y].visited) {
      // eminate the wall between the current cell and the next cell
      eminateWall(next.x, next.y, (next.direction + 2) % 4); //+2 is the opposite direction
      // the next cell is the current cell
      current = { x: next.x, y: next.y };
      maze[current.x][current.y].visited = true;
      addNeighbors(current.x, current.y);
    }
    count++;
    if (count % (speed*2) == 0) {
      await sleep(interval);
    }
  }
  console.log("Prim");
}
// kruskal's algorithm
async function Kruskal_Generate() {
  // create the edges
  let edges = [];
  for (let i = 0; i < Constant.row; i++) {
    for (let j = 0; j < Constant.col; j++) {
      if (i - 1 >= 0) edges.push({ x: i, y: j, direction: 3 });
      if (j - 1 >= 0) edges.push({ x: i, y: j, direction: 0 });
    }
  } // shuffle the edges
  edges = edges.sort(() => Math.random() - 0.5);
  // create the disjoint set
  let disjointSet = new Array(Constant.row * Constant.col);
  for (let i = 0; i < Constant.row * Constant.col; i++) {
    disjointSet[i] = i;
  } // init parent
  function find(x) {
    if (disjointSet[x] != x) {
      disjointSet[x] = find(disjointSet[x]);
    }
    return disjointSet[x];
  }
  function union(x, y) {
    disjointSet[find(x)] = find(y);
  }
  // eminate the wall
  var count = 0;
  for (let edge of edges) {
    let x = edge.x;
    let y = edge.y;
    let direction = edge.direction;
    let x1 = x + (direction == 1 ? 1 : direction == 3 ? -1 : 0);
    let y1 = y + (direction == 2 ? 1 : direction == 0 ? -1 : 0);
    if (find(x * Constant.col + y) != find(x1 * Constant.col + y1)) {
      union(x * Constant.col + y, x1 * Constant.col + y1);
      eminateWall(x, y, direction);
      count++;
      if (count % (speed*2) == 0) {
        await sleep(interval);
      }
    }
  }
  console.log("Kruskal");
}
async function Recur_Generate() {
  clearMaze();
  //Recursive Divide
  async function recur(x, y, width, height) {
    if (width < 2 || height < 2) return;
    // random a point
    let dx = Math.floor(Math.random() * (width - 1) + x + 1);
    let dy = Math.floor(Math.random() * (height - 1) + y + 1); //[1, width-1)]
    // draw the wall
    let mx = dx-1;
    let my = dy-1;
    for (let i = x; i < x + width; i++) {
      if (i % speed == 0) await sleep(interval);
      generateWall(i, my, 2);
    }
    for (let i = y; i < y + height; i++) {
      if (i % speed == 0) await sleep(interval);
      generateWall(mx, i, 1);
    }
    // width
    const rxw = width + x - dx;
    const lxw = dx - x;
    const tyw = dy - y;
    const byw = height + y - dy;
    // random the door not generate
    const rand = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
      let cx = mx;
      let cy = my;
      let door;
      if (rand == i) continue;
      // random the door
      switch (i) {
        case 0:
          cy = Math.floor(Math.random() * byw + dy);
          break;
        case 1:
          cx = Math.floor(Math.random() * lxw + x);
          break;
        case 2:
          cy = Math.floor(Math.random() * tyw + y);
          break;
        case 3:
          cx = Math.floor(Math.random() * rxw + dx);
          break;
      }
      eminateWall(cx, cy, i % 2 ? 2 : 1);
    }
    // recur
    await recur(x, y, lxw, tyw);
    await recur(dx, y, rxw, tyw);
    await recur(x, dy, lxw, byw);
    await recur(dx, dy, rxw, byw);
  }
  await recur(0, 0, Constant.row, Constant.col);
  console.log("Recur");
}
