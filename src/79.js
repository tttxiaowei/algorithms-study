/*
https://leetcode-cn.com/problems/word-search/
79. 单词搜索
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

示例 1：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true

示例 2：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true

示例 3：
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false
 
提示：
m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board 和 word 仅由大小写英文字母组成
 
进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
*/


/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let m = board.length
    let n = board[0].length
    let len = word.length
    let existsMap = []
    for (let i = 0; i < m; i++) {
        existsMap[i] = []
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (word[0] === board[i][j]) {
                existsMap[i][j] = 1
                if (find(i, j, 1)) {
                    return true
                } else {
                    existsMap[i][j] = 0
                }
            }
        }
    }

    function find(i, j, k) {
        if (k === len) {
            return true
        }
        let tmp = i - 1
        let nextK = k + 1
        if (i > 0 && word[k] === board[tmp][j]) { // top
            if (!existsMap[tmp][j]) {
                existsMap[tmp][j] = 1
                if(find(tmp, j, nextK)) {
                    return true
                } else {
                    existsMap[tmp][j] = 0
                }
            }
        }
        tmp = j + 1
        if (j < n - 1 && word[k] === board[i][tmp]) { // right
            if (!existsMap[i][tmp]) {
                existsMap[i][tmp] = 1
                if(find(i, tmp, nextK)) {
                    return true
                } else {
                    existsMap[i][tmp] = 0
                }
            }
        }
        tmp = i + 1
        if (i < m - 1 && word[k] === board[tmp][j]) { // bottom
            if (!existsMap[tmp][j]) {
                existsMap[tmp][j] = 1
                if(find(tmp, j, nextK)) {
                    return true
                } else {
                    existsMap[tmp][j] = 0
                }
            }
        }
        tmp = j - 1
        if (j > 0 && word[k] === board[i][tmp]) { // left
            if (!existsMap[i][tmp]) {
                existsMap[i][tmp] = 1
                if(find(i, tmp, nextK)) {
                    return true
                } else {
                    existsMap[i][tmp] = 0
                }
            }
        }
        return false
    }
    return false
};
console.time()
for (let i = 0; i < 10000; i++) {
    exist( [["C","A","A"],["A","A","A"],["B","C","D"]], "AAB")
    exist( [["A","B","E"],["B","C","D"]], "ABCDEB")
    exist( [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCEFSADEESE")
    exist( [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")
    exist( [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")
    exist([["a","b"]], "ba")
    exist([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCESEEEFS")
    exist( [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")
    exist( [["a","a","a","a"],["a","a","a","a"],["a","a","a","a"]], "aaaaaaaaaaaaa")
}
console.log(JSON.stringify(exist( [["C","A","A"],["A","A","A"],["B","C","D"]], "AAB")))
console.log(JSON.stringify(exist( [["A","B","E"],["B","C","D"]], "ABCDEB")))
console.log(JSON.stringify(exist([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCEFSADEESE")))
console.log(JSON.stringify(exist( [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")))
console.log(JSON.stringify(exist( [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")))
console.log(JSON.stringify(exist([["a","b"]], "ba")))
console.log(JSON.stringify(exist([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], "ABCESEEEFS")))
console.log(JSON.stringify(exist( [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")))
console.log(JSON.stringify(exist( [["a","a","a","a"],["a","a","a","a"],["a","a","a","a"]], "aaaaaaaaaaaaa")))

console.timeEnd()