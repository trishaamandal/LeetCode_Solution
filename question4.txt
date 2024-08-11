1568. Minimum Number of Days to Disconnect Island
Solved
Hard
Topics
Companies
Hint
You are given an m x n binary grid grid where 1 represents land and 0 represents water. An island is a maximal 4-directionally (horizontal or vertical) connected group of 1's.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.

In one day, we are allowed to change any single land cell (1) into a water cell (0).

Return the minimum number of days to disconnect the grid.

 

Example 1:


Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]

Output: 2
Explanation: We need at least 2 days to get a disconnected grid.
Change land grid[1][1] and grid[0][2] to water and get 2 disconnected island.
Example 2:


Input: grid = [[1,1]]
Output: 2
Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0 islands.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 30
grid[i][j] is either 0 or 1.




solution: 
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minDays = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    const isConnected = () => {
        let visited = Array.from({ length: m }, () => Array(n).fill(false));
        
        const dfs = (i, j) => {
            if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 0 || visited[i][j]) {
                return;
            }
            visited[i][j] = true;
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };
        
        let foundIsland = false;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 1 && !visited[i][j]) {
                    if (foundIsland) return false; 
                    foundIsland = true;
                    dfs(i, j);
                }
            }
        }
        return foundIsland;
    };
    
    if (!isConnected()) return 0;
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                grid[i][j] = 0;
                if (!isConnected()) return 1;
                grid[i][j] = 1; 
            }
        }
    }
    
    return 2;
};

