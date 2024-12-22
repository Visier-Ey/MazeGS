// Description: This file contains the auxilary functions for the maze generation and solving algorithms.
    // auxilary function

    function drawLine(x, y, direction) {
        ctx.fillStyle = "#000000";
        switch (direction) {
            case 0:
                ctx.beginPath();
                ctx.moveTo(x * Constant.cellWidth, y * Constant.cellHeight);
                ctx.lineTo(x * Constant.cellWidth + Constant.cellWidth, y * Constant.cellHeight);
                ctx.stroke();
                break;
            case 1:
                ctx.beginPath();
                ctx.moveTo(x * Constant.cellWidth + Constant.cellWidth, y * Constant.cellHeight);
                ctx.lineTo(x * Constant.cellWidth + Constant.cellWidth, y * Constant.cellHeight + Constant.cellHeight);
                ctx.stroke();
                break;
            case 2:
                ctx.beginPath();
                ctx.moveTo(x * Constant.cellWidth + Constant.cellWidth, y * Constant.cellHeight + Constant.cellHeight);
                ctx.lineTo(x * Constant.cellWidth, y * Constant.cellHeight + Constant.cellHeight);
                ctx.stroke();
                break;
            case 3:
                ctx.beginPath();
                ctx.moveTo(x * Constant.cellWidth, y * Constant.cellHeight + Constant.cellHeight);
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
                ctx.fillRect(x * Constant.cellWidth + halfWidth -halfLineWidth, y * Constant.cellHeight - halfHeight +halfLineWidth , lineWidth, Constant.cellHeight);
                break;
            case 1:
                ctx.fillRect(x * Constant.cellWidth + halfWidth -halfLineWidth, y * Constant.cellHeight + halfHeight -halfLineWidth, Constant.cellWidth , lineWidth);
                break;
            case 2:
                ctx.fillRect(x * Constant.cellWidth + halfWidth -halfLineWidth, y * Constant.cellHeight +halfHeight -halfLineWidth, lineWidth, Constant.cellHeight );
                break;
            case 3:
                ctx.fillRect(x * Constant.cellWidth - halfWidth + halfLineWidth, y * Constant.cellHeight + halfHeight -halfLineWidth, Constant.cellWidth, lineWidth);
                break;
        }
    }
    function markFindPath(x, y,direction) {
        ctx.fillStyle = "#00FF00";
        const halfWidth = Constant.cellWidth / 2;
        const halfHeight = Constant.cellHeight / 2;
        const lineWidth = parseInt(Constant.cellWidth / 5);
        const halfLineWidth = parseInt(lineWidth / 2);
        switch (direction) {
            case 0:
                ctx.fillRect(x * Constant.cellWidth + halfWidth -halfLineWidth, y * Constant.cellHeight - halfHeight +halfLineWidth , lineWidth, Constant.cellHeight);
                break;
            case 1:
                ctx.fillRect(x * Constant.cellWidth + halfWidth -halfLineWidth, y * Constant.cellHeight + halfHeight -halfLineWidth, Constant.cellWidth , lineWidth);
                break;
            case 2:
                ctx.fillRect(x * Constant.cellWidth + halfWidth -halfLineWidth, y * Constant.cellHeight +halfHeight -halfLineWidth, lineWidth, Constant.cellHeight );
                break;
            case 3:
                ctx.fillRect(x * Constant.cellWidth - halfWidth + halfLineWidth, y * Constant.cellHeight + halfHeight -halfLineWidth, Constant.cellWidth, lineWidth);
                break;
        }
    }
    function drawMarkPath(markStack) {
      current = markStack.pop();
        while(current){
            markFindPath(current.x,current.y,current.direction);
            current = markStack.pop();
        }
    }
    // 0: top, 1: right, 2: bottom, 3: left
    function clearWall(x, y, direction) {
        switch (direction) {
            case 0:
                ctx.clearRect(x * Constant.cellWidth+1, y * Constant.cellHeight-1 , Constant.cellWidth-1, 2);
                break;
            case 1:
                ctx.clearRect((x + 1) * Constant.cellWidth-1 , y * Constant.cellHeight+1, 2, Constant.cellHeight-1);
                break;
            case 2:
                ctx.clearRect(x * Constant.cellWidth+1, (y + 1) * Constant.cellHeight -1 , Constant.cellWidth-1, 2);
                break;
            case 3:
                ctx.clearRect(x * Constant.cellWidth -1 , y * Constant.cellHeight+1, 2, Constant.cellHeight-1);
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
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function init_maze() {
        maze = new Array(Constant.row);
        for (let i = 0; i < Constant.row; i++) {// each row has how many cols
            maze[i] = new Array(Constant.col);
            for (let j = 0; j < Constant.col; j++) {
                maze[i][j] = {
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                    visited: false
                }
            }
        }
        drawMaze();
    }
    
    function drawMaze() {
        //clear the canvas
        ctx.clearRect(0, 0, Constant.width, Constant.height);
        //drawLine
        for (let i = 0; i < Constant.col; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * Constant.cellHeight);
            ctx.lineTo(Constant.width, i * Constant.cellHeight);
            ctx.stroke();
        }
        for (let i = 0; i < Constant.row; i++) {
            ctx.beginPath();
            ctx.moveTo(i * Constant.cellWidth, 0);
            ctx.lineTo(i * Constant.cellWidth, Constant.height);
            ctx.stroke();
        }
        //draw start and end
        drawStartAndEnd();
    }

    function drawStartAndEnd(){
        ctx.fillStyle = "blue";
        ctx.fillRect(Constant.start.x*Constant.cellWidth,Constant.start.y*Constant.cellHeight,Constant.cellWidth,Constant.cellHeight);
        ctx.fillStyle = "yellow";
        ctx.fillRect(Constant.end.x*Constant.cellWidth,Constant.end.y*Constant.cellHeight,Constant.cellWidth,Constant.cellHeight);
    }

    function setRow(row){
        Constant.row = row;
        Constant.cellWidth = Constant.width/row;
        Constant.end.x = row-1;
        
        document.getElementById("End").value = `[${Constant.end.x},${Constant.end.y}]`;
    }
    function setCol(col){
        Constant.col = col;
        Constant.cellHeight = Constant.height/col;
        Constant.end.y = col-1;
        
        document.getElementById("End").value = `[${Constant.end.x},${Constant.end.y}]`;
    }

    function GlobalInit(){
        optionList ={
            maze: {
                label: "Maze",
                instance: document.getElementById("MazeLabel")
            },
            generateAlgorithm: {
                label: "Generate Algorithm",
                instance: document.getElementById("GenerateAlgorithm"),
                options: [
                    {
                        label: "DFS Algorithm",
                        instance: document.getElementById("DFS_Generate")
                    },
                    {
                        label: "Recursive Backtracker",
                        instance: document.getElementById("Recur_Generate")
                    },
                    {
                        label: "Prim's Algorithm",
                        instance: document.getElementById("Prim_Generate")
                    },
                    {
                        label: "Kruskal's Algorithm",
                        instance: document.getElementById("Kruskal_Generate")
                    }
                ]
            },
            searchAlgorithm: {
                label: "Search Algorithm",
                instance: document.getElementById("SearchAlgorithm"),
                options: [
                    {
                        label: "BFS Algorithm",
                        instance: document.getElementById("BFS_Search")
                    },
                    {
                        label: "DFS Algorithm",
                        instance: document.getElementById("DFS_Search")
                    },
                    {
                        label: "Right Hand Rule",
                        instance: document.getElementById("RightHand_Search")
                    },
                    {
                        label: "Dijkstra's Algorithm",
                        instance: document.getElementById("Dijkstra_Search")
                    },
                    {
                        label: "A* Algorithm",
                        instance: document.getElementById("Astar_Search")
                    }
                ]
            },
            setting: {
                label: "Setting",
                instance: document.getElementById("SettingLabel")
            }
        }
    
        screens = {
            maze: document.getElementById("screenMaze"),
            setting: document.getElementById("screenMazeSetting")
        }
        canvas = document.querySelector(".MazeCanvas");
        ctx = canvas.getContext("2d");
        //test constant
        interval = 0;
        row = 20;
        col = 20;
        Constant={
            row:row,
            col:col,
            width:parseFloat(getComputedStyle(canvas).width.split("px")[0]),
            height:parseFloat(getComputedStyle(canvas).height.split("px")[0]),
            cellWidth:parseFloat(getComputedStyle(canvas).width.split("px")[0])/row,
            cellHeight:parseFloat(getComputedStyle(canvas).height.split("px")[0])/col,
            start:{
                x:0,
                y:0
            },
            end:{
                x:row-1,
                y:col-1
            },
            distanceX:1,
            distanceY:1
        };

        (function canvasInit(){
            canvas.width = Constant.width;
            canvas.height = Constant.height;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Constant.width * dpr;
            canvas.height = Constant.height * dpr;
            ctx.scale(dpr, dpr);
            document.getElementById("Start").value = `[0,0]`;
            document.getElementById("End").value = `[19,19]`;
        })();
    }

    function clearPath(){
        ctx.clearRect(0, 0, Constant.width, Constant.height);
        drawMaze();
    }

    function drawWall(x, y, direction) {
        switch (direction) {
            case 0:
                ctx.fillRect(x * Constant.cellWidth, y * Constant.cellHeight, Constant.cellWidth, 2);
                break;
            case 1:
                ctx.fillRect((x + 1) * Constant.cellWidth - 2, y * Constant.cellHeight, 2, Constant.cellHeight);
                break;
            case 2:
                ctx.fillRect(x * Constant.cellWidth, (y + 1) * Constant.cellHeight - 2, Constant.cellWidth, 2);
                break;
            case 3:
                ctx.fillRect(x * Constant.cellWidth, y * Constant.cellHeight, 2, Constant.cellHeight);
                break;
        }
    }

    function recorverMaze(x, y) {
       // draw wall from maze
       ctx.clearRect(0,0,Constant.width,Constant.height);
       drawStartAndEnd();
       ctx.fillStyle = "black";
       for (let i = 0; i<Constant.row; i++){
           for (let j = 0; j<Constant.col; j++){
               if (maze[i][j].top){
                   drawLine(i,j,0);
               }
               if (maze[i][j].right){
                   drawLine(i,j,1);
               }
               if (maze[i][j].bottom){
                   drawLine(i,j,2);
               }
               if (maze[i][j].left){
                   drawLine(i,j,3);
               }
           }
       }
    }

    function switchToMaze(){
        screens.maze.classList.add("screenShow");
        screens.setting.classList.remove("screenShow");
    }

    function switchToSetting(){
        screens.setting.classList.add("screenShow");
        screens.maze.classList.remove("screenShow");
    }