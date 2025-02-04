# MazeGS

## 项目介绍 Maze Generate/Solution
<br>
本项目旨在展示一些迷宫生成算法以及迷宫搜索算法
<br>
本项目的主要语言为JavaScript、以构建静态网页的方式提供良好的交互。并且提供了一个线上测试网页:

<https://visier.icu/backend/Works/JS/MazeGS/index.html>
<br>

## 项目结构
```
│  index.html
│
├─img
│      2.gif
│      3.gif
│      cheers.gif
│      circle.gif
│      StupidCat.gif
│
└─script
        main.js
        auxilaryFunc.js
        dataStructure.js
        EventListener.js
        generateAlgorithm.js
        searchAlgorithm.js
```
## 算法
### 迷宫生成算法
- DFS Generator
- Recursive Divide
- Prim Generator
- Kruskal Generator
### 路径搜索算法
- BFS Algorithm
- DFS Algorithm
- RightHand Search
- A* Algorithm DFS
- A* Algorithm BFS

## 特色
本项目提供了便捷友好的图形化交互，可以快速生成案例，并对比结果，运行环境要求只需一个浏览器

生成算法中Kruskal性能最为优良，因为其无需从相邻节点扩展边界
搜索算法中A*算法运用到了启发式算法，性能较为优良

## 使用
由于构建的是静态网页，只要有个稍微现代点的浏览器(Edge...)

双击index.html文件即可运行