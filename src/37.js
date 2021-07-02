/**
 力扣序号37. 解数独
https://leetcode-cn.com/problems/sudoku-solver/
编写一个程序，通过填充空格来解决数独问题。
数独的解法需 遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
数独部分空格内已填入了数字，空白格用 '.' 表示。

示例：

输入：board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
输出：[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]

提示：
board.length == 9
board[i].length == 9
board[i][j] 是一位数字或者 '.'
题目数据 保证 输入数独仅有一个解
**/

function printBoard(board) {
    board.forEach(item => {
        console.log(JSON.stringify(item))
    })
}
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    printBoard(board)
    let arr = ['1','2','3','4','5','6','7','8','9']
    let rowArr = []
    let colArr = []
    let blockArr = [[], [], []]
    for (let i = 0; i < 9; i++) {
        rowArr.push(new Set(arr))
        colArr.push(new Set(arr))
        blockArr[Math.floor(i / 3)][i % 3] = new Set(arr)
    }
    
    for (let i = 0; i < 9; i++) {
        let rowIndex = Math.floor(i / 3)
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') {
                rowArr[i].delete(board[i][j])
                colArr[j].delete(board[i][j])
                blockArr[rowIndex][Math.floor(j / 3)].delete(board[i][j])
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        let rowIndex = Math.floor(i / 3)
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') { // 空
                let blockItem = blockArr[rowIndex][Math.floor(j / 3)]
                board[i][j] = new Set(rowArr[i])
                board[i][j].forEach(item => {
                    if (!rowArr[i].has(item) || !colArr[j].has(item) || !blockItem.has(item) ) {
                        board[i][j].delete(item)
                    }
                })
            }
        }
    }

    let needUpdate = true
    while (needUpdate) {
        needUpdate = false
        for (let i = 0; i < 9; i++) {
            let rowIndex = Math.floor(i / 3)
            for (let j = 0; j < 9; j++) {
                if (board[i][j].size) {
                    let blockItem = blockArr[rowIndex][Math.floor(j / 3)]
                    if (board[i][j].size === 1) {
                        board[i][j] = [...board[i][j]][0]
                        rowArr[i].delete(board[i][j])
                        colArr[j].delete(board[i][j])
                        blockItem.delete(board[i][j])
                        needUpdate = true
                    } else {
                        board[i][j].forEach(item => {
                            if (!rowArr[i].has(item) || !colArr[j].has(item) || !blockItem.has(item) ) {
                                board[i][j].delete(item)
                                needUpdate = true
                            }
                        })
                    }
                }
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        let rowIndex = Math.floor(i / 3)
        for (let j = 0; j < 9; j++) {
            let blockItem = blockArr[rowIndex][Math.floor(j / 3)]
            if (board[i][j].size === 2) {
            }
        }
    }
    
    printBoard(board)
};
// console.log(JSON.stringify(solveSudoku( [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]])))
console.log(JSON.stringify(solveSudoku([[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]])))
