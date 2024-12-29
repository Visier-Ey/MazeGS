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
        optionList.customMaze.instance.addEventListener("click", () => {
            switchToCustomMaze();
        })
        //collapseAside
        document.querySelector(".collapseAsideLeft").addEventListener("click", () => {
            document.getElementById("AsideLeft").classList.toggle("collapse");
        })
        document.querySelector(".collapseAsideRight").addEventListener("click", () => {
            document.getElementById("AsideRight").classList.toggle("collapse");
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
        document.getElementById("Dynamic").addEventListener("click", (e) => {
            interval = e.target.checked? 1 : 0;
        })
        document.getElementById("Speed").addEventListener("change", (e) => {
            setSpeed(parseInt(e.target.value));
        })
        document.getElementById("DistanceY").addEventListener("change", (e) => {
            Constant.distanceY = parseInt(e.target.value);
        })
        document.getElementById("DistanceX").addEventListener("change", (e) => {
            Constant.distanceX = parseInt(e.target.value);
        })

        document.getElementById('AMaze').addEventListener('click', function(){
            var userInput = document.getElementById('userInput').value;
            var adjMatrix = analysisText(userInput);
            maze = convertAdjMatrixToMaze(adjMatrix);
            switchToMaze();
            recorverMaze();
        });
        document.getElementById('CSE').addEventListener('click', function(){
            // start [x,y] end [x,y]
            var start = document.getElementById('StartInput').value.split(',');
            var end = document.getElementById('EndInput').value.split(',');
            // console.log(start, end);
            var startPos = {x: parseInt(start[0].split('[')[1]), y: parseInt(start[1].split(']')[0])};
            var endPos = {x: parseInt(end[0].split('[')[1]), y: parseInt(end[1].split(']')[0])};
            // console.log(startPos, endPos);
            setStartEnd(startPos, endPos);
            alert('Start and End set');
        });
        document.getElementById('fileInput').addEventListener('change', function(){
            var file = this.files[0];
            var reader = new FileReader();
            // if json file
            if(file.name.split('.').pop() == 'json'){
                reader.onload = function(e){
                    var text = e.target.result;
                    var json = JSON.parse(text);
                    analysisJSON(text);
                    switchToMaze();
                    recorverMaze();
                };
                reader.readAsText(file);
                return;
            }if(file.name.split('.').pop() == 'txt'){
                reader.onload = function(e){
                    var text = e.target.result;
                    var adjMatrix = analysisText(text);
                    maze = convertAdjMatrixToMaze(adjMatrix);
                    switchToMaze();
                    recorverMaze();
                };
                reader.readAsText(file);
                return;
            }
        
        });
    }
