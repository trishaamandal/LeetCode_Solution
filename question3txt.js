An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.

Given the grid grid represented as a string array, return the number of regions.

Note that backslash characters are escaped, so a '\' is represented as '\\'.

 

Example 1:


Input: grid = [" /","/ "]
Output: 2
Example 2:


Input: grid = [" /","  "]
Output: 1
Example 3:


Input: grid = ["/\\","\\/"]
Output: 5
Explanation: Recall that because \ characters are escaped, "\\/" refers to \/, and "/\\" refers to /\.
 

Constraints:

n == grid.length == grid[i].length
1 <= n <= 30
grid[i][j] is either '/', '\', or ' '.



# answer : 
/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function(grid) {
    let n = grid.length;
    let graph = new Array(n * 3).fill(0).map(() => new Array(n * 3).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '/') {
                graph[i * 3][j * 3 + 2] = graph[i * 3 + 1][j * 3 + 1] = graph[i * 3 + 2][j * 3] = 1;
            }
            if (grid[i][j] === '\\') {
                graph[i * 3][j * 3] = graph[i * 3 + 1][j * 3 + 1] = graph[i * 3 + 2][j * 3 + 2] = 1;
            }
        }
    }
    let res = 0;
    for (let i = 0; i < n * 3; i++) {
        for (let j = 0; j < n * 3; j++) {
            if (graph[i][j] === 0) {
                dfs(graph, i, j);
                res++;
            }
        }
    }
    return res;
};

function dfs(graph, i, j) {
    if (i < 0 || i >= graph.length || j < 0 || j >= graph[0].length || graph[i][j] === 1) {
        return;
    }
    graph[i][j] = 1;
    dfs(graph, i - 1, j);
    dfs(graph, i + 1, j);
    dfs(graph, i, j - 1);
    dfs(graph, i, j + 1);
}
