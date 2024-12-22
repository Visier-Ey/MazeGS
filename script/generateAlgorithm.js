// description: generate maze using different algorithms
    async function DFS_Generate() {
        let stack = [];
        let current = { x: 0, y: 0 };
        stack.push(current);
        maze[current.x][current.y].visited = true;

        while (stack.length > 0) {
            let x = current.x;
            let y = current.y;
            let directions = [];

            if (y - 1 >= 0 && !maze[x][y - 1].visited) directions.push(0);
            if (x + 1 < Constant.row && !maze[x + 1][y].visited) directions.push(1);
            if (y + 1 < Constant.col && !maze[x][y + 1].visited) directions.push(2);
            if (x - 1 >= 0 && !maze[x - 1][y].visited) directions.push(3);

            if (directions.length > 0) {
                let direction = directions[Math.floor(Math.random() * directions.length)];
                switch (direction) {
                    case 0:
                        eminateWall(x, y, 0);
                        current = { x: x, y: y - 1 };
                        break;
                    case 1:
                        eminateWall(x, y, 1);
                        current = { x: x + 1, y: y };
                        break;
                    case 2:
                        eminateWall(x, y, 2);
                        current = { x: x, y: y + 1 };
                        break;
                    case 3:
                        eminateWall(x, y, 3);
                        current = { x: x - 1, y: y };
                        break;
                }
                stack.push(current);
                maze[current.x][current.y].visited = true;
                await sleep(interval);
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
            if (y - 1 >= 0 && !maze[x][y - 1].visited) neighbors.push({ x: x, y: y - 1, direction: 0 });
            if (x + 1 < Constant.row && !maze[x + 1][y].visited) neighbors.push({ x: x + 1, y: y, direction: 1 });
            if (y + 1 < Constant.col && !maze[x][y + 1].visited) neighbors.push({ x: x, y: y + 1, direction: 2 });
            if (x - 1 >= 0 && !maze[x - 1][y].visited) neighbors.push({ x: x - 1, y: y, direction: 3 });
        }

        addNeighbors(current.x, current.y);

        while (neighbors.length > 0) {
            let randomIndex = Math.floor(Math.random() * neighbors.length);
            let next = neighbors.splice(randomIndex, 1)[0];

            if (!maze[next.x][next.y].visited) {
            // eminate the wall between the current cell and the next cell
            eminateWall(next.x, next.y, (next.direction + 2) % 4);//+2 is the opposite direction
            // the next cell is the current cell
            current = { x: next.x, y: next.y };
            maze[current.x][current.y].visited = true;
            addNeighbors(current.x, current.y);
            }
            await sleep(interval);
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
        }
        edges = edges.sort(() => Math.random() - 0.5);
        // create the disjoint set
        let disjointSet = new Array(Constant.row * Constant.col);
        for (let i = 0; i < Constant.row * Constant.col; i++) {
            disjointSet[i] = i;
        }
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
        for (let edge of edges) {
            let x = edge.x;
            let y = edge.y;
            let direction = edge.direction;
            let x1 = x + (direction == 1 ? 1 : direction == 3 ? -1 : 0);
            let y1 = y + (direction == 2 ? 1 : direction == 0 ? -1 : 0);
            if (find(x * Constant.col + y) != find(x1 * Constant.col + y1)) {
                union(x * Constant.col + y, x1 * Constant.col + y1);
                eminateWall(x, y, direction);
                await sleep(interval);
            }
        }
        console.log("Kruskal");
    }
    async function Recur_Generate() {
        async function recur(x, y) {
            maze[x][y].visited = true;
            let directions = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
            for (let direction of directions) {
                await sleep(interval);
                switch (direction) {
                    case 0:
                        if (y - 1 >= 0 && !maze[x][y - 1].visited) {
                            eminateWall(x, y, 0);
                            recur(x, y - 1);
                        }
                        break;
                    case 1:
                        if (x + 1 < Constant.row && !maze[x + 1][y].visited) {
                            eminateWall(x, y, 1);
                            recur(x + 1, y);
                        }
                        break;
                    case 2:
                        if (y + 1 < Constant.col && !maze[x][y + 1].visited) {
                            eminateWall(x, y, 2);
                            recur(x, y + 1);
                        }
                        break;
                    case 3:
                        if (x - 1 >= 0 && !maze[x - 1][y].visited) {
                            eminateWall(x, y, 3);
                            recur(x - 1, y);
                        }
                        break;
                }
            }
        }
        await recur(0, 0);
        console.log("Recur");
    }
      
    
