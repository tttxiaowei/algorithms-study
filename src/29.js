/*
力扣序号64. 最小路径和
https://leetcode-cn.com/problems/minimum-path-sum/
给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。

示例 2：
输入：grid = [[1,2,3],[4,5,6]]
输出：12

提示：
m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 100
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length
    const n = grid[0].length
    const dp = new Array()
    for (let i = 0; i < m; i++) {
        dp[i] = []
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                dp[i][j] = grid[i][j]
            } else if (i === 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j]
            } else if (j === 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j]
            } else {
                dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
            }
        }
    }    
    return dp[m - 1][n - 1]
};

console.log(minPathSum([[1,2,3],[4,5,6]]))