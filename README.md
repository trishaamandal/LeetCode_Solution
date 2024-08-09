# LeetCode_Solution
solution of Basic ,  Intermediate , Hard  Questions  of LeetCode .



# (1)- A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.Given a row x col grid of integers, how many 3 x 3 contiguous magic square subgrids are there?..Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.
# Example 1:
# Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
# Output: 1
# Explanation: 
# The following subgrid is a 3 x 3 magic square:while this one is not:In total, there is only one magic square inside the given grid.
# Example 2:
# Input: grid = [[8]]
# Output: 0
 
# Constraints:
# row == grid.length
# col == grid[i].length
# 1 <= row, col <= 10
# 0 <= grid[i][j] <= 15

# Answer: 
const numMagicSquaresInside = grid => {
  const magicSquares = new Set([
    '276951438',
    '294753618',
    '438951276',
    '492357816',
    '618753294',
    '672159834',
    '816357492',
    '834159672',
  ]);
  let cnt = 0;
  for (let i = 0; i < grid.length - 2; i++)
    for (let j = 0; j < grid[0].length - 2; j++)
      if (
        magicSquares.has(
          grid[i][j].toString() +
            grid[i][j + 1] +
            grid[i][j + 2] +
            grid[i + 1][j] +
            grid[i + 1][j + 1] +
            grid[i + 1][j + 2] +
            grid[i + 2][j] +
            grid[i + 2][j + 1] +
            grid[i + 2][j + 2],
        )
      )
        cnt++;
  return cnt;
};
