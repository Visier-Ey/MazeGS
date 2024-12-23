    //Event Listener
    //optionList
    function GlobalAddEventListener() {
        document.getElementById('GenerateAlgorithmLabel').addEventListener("click", () => {
            optionList.generateAlgorithm.instance.classList.toggle("show");
        })
        document.getElementById('SearchAlgorithmLabel').addEventListener("click", () => {
            optionList.searchAlgorithm.instance.classList.toggle("show");
        })
        //generateAlgorithm
        optionList.generateAlgorithm.options.forEach(option => {
            option.instance.addEventListener("click", (e) => {
                init_maze();
                drawMaze();
                switchToMaze();
                optionList.generateAlgorithm.instance.classList.toggle("chosen");
                switch (option.label) {
                    case "DFS Algorithm":
                        DFS_Generate();
                        break;
                    case "Recursive Backtracker":
                        Recur_Generate();
                        break;
                    case "Prim's Algorithm":
                        Prim_Generate();
                        break;
                    case "Kruskal's Algorithm":
                        Kruskal_Generate();
                        break;
                }
                e.stopPropagation();
            })
        })
        //searchAlgorithm
        optionList.searchAlgorithm.options.forEach(option => {
            option.instance.addEventListener("click", (e) => {
                optionList.searchAlgorithm.instance.classList.toggle("chosen");
                switchToMaze();
                recorverMaze();
                switch (option.label) {
                    case "BFS Algorithm":
                        BFS_Search();
                        break;
                    case "DFS Algorithm":
                        DFS_Search();
                        break;
                    case "Right Hand Rule":
                        RightHand_Search();
                        break;
                    case "Dijkstra's Algorithm":
                        Dijkstra_Search();
                        break;
                    case "A* Algorithm DFS":
                        AStar_Search(0);
                        break;
                    case "A* Algorithm BFS":
                        AStar_Search(1);
                        break;
                }
                e.stopPropagation();
            })
        })
        // screens
        optionList.maze.instance.addEventListener("click", () => {
            switchToMaze();
        })
        optionList.setting.instance.addEventListener("click", () => {
            switchToSetting();
        })
        //collapseAside
        document.querySelector(".collapseAside").addEventListener("click", () => {
            document.querySelector("nav").classList.toggle("collapse");
        })

        // interface
        document.getElementById("Row").addEventListener("change", (e) => {
            setRow(parseInt(e.target.value))
            init_maze();
        })
        document.getElementById("Col").addEventListener("change", (e) => {
            setCol(parseInt(e.target.value))
            init_maze();
        })
        document.getElementById("FindPath").addEventListener("click", (e) => {
            FindPath = e.target.checked;
        })
        document.getElementById("DistanceY").addEventListener("change", (e) => {
            Constant.distanceY = parseInt(e.target.value);
        })
        document.getElementById("DistanceX").addEventListener("change", (e) => {
            Constant.distanceX = parseInt(e.target.value);
        })
    }