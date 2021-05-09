/**
 力扣序号48. 旋转图像
https://leetcode-cn.com/problems/rotate-image/
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]

示例 2：
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

示例 3：
输入：matrix = [[1]]
输出：[[1]]

示例 4：
输入：matrix = [[1,2],[3,4]]
输出：[[3,1],[4,2]]
 

提示：
matrix.length == n
matrix[i].length == n
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
**/
/**
 * 用一个一维数组的额外空间
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    console.log(JSON.stringify(matrix))
    function rotateOne(level) {
        let arr = matrix[level].slice(level, level ? -level : undefined)
        let len = arr.length
        if (len === 1) {
            return
        }       
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < len; j++) {
                if ((!j && i) || (i === 3 && j === len - 1)) {
                    continue
                }
                let x, y
                switch (i) {
                    case 0: 
                        x = level + j
                        y = level + len - 1
                        break
                    case 1: 
                        x = level + len - 1
                        y = level + len - 1 - j
                        break
                    case 2: 
                        x = level + len - 1 - j
                        y = level
                        break
                    case 3: 
                        x = level
                        y = level + j
                        break
                    
                }
                ([matrix[x][y], arr[j]] = [arr[j], matrix[x][y]])
            }
        }
    }
    let times = Math.ceil(matrix.length / 2)
    for (let i = 0; i < times; i++) {
        rotateOne(i)
    }
    console.log(JSON.stringify(matrix))
};

/**
 * 原地旋转
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate1 = function(matrix) {
    console.log(JSON.stringify(matrix))
    let n = matrix.length
    let times = n >> 1
    for (let i = 0; i < times; i++) {
        let times1 = n - i - 1
        for (let j = i; j < times1; j++) {
            let tmp = matrix[i][j]
            matrix[i][j] = matrix[n - j - 1][i]
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
            matrix[j][n - i - 1] = tmp
        }
    }
    console.log(JSON.stringify(matrix))
};
console.log(JSON.stringify(rotate1([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])))
