/*
力扣序号6. Z 字形变换
https://leetcode-cn.com/problems/zigzag-conversion/
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
请你实现这个将字符串进行指定行数变换的函数：

示例 1：
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR" 

示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I

示例 3：
输入：s = "A", numRows = 1
输出："A"
 
提示：
1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000

*/
/**
 * 
 * 二维数组画z字
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) {
        return s
    }
    const len = s.length
    let x = y = 0
    let asc = true
    const maxY = numRows - 1
    const arr = new Array()
    for(let i = 0; i < len; i++) {
        if (!arr[y]) {
            arr[y] = []
        }
        arr[y][x] = s[i]
        if (asc) {
            if (y < maxY) {
                y++
            } else {
                y--
                x++
                asc = false
            }
        } else {
            x++
            if (y > 0) {
                y--
            } else {
                y++
                asc = true
            }
        }
    }
    return arr.reduce((str, item) => {
        return str + item.join('') 
    }, '')
};
/**
 * 
 * 一维数组
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert1 = function(s, numRows) {
    if (numRows === 1) {
        return s
    }
    const len = s.length
    let down = true
    let row = 0
    const maxRow = numRows - 1
    const arr = new Array(numRows).fill('')
    for(let i = 0; i < len; i++) {
        arr[row] += s[i]
        if (down) {
            if (row === maxRow) {
                row--
                down = false
            } else {
                row++
            }
        } else {
            if (row === 0) {
                down = true
                row++
            } else {
                row--
            }
        }
    }
    return arr.join('')
};
console.log(convert1('PAYPALISHIRING', 3))