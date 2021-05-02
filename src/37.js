
/*
力扣序号22. 括号生成
https://leetcode-cn.com/problems/generate-parentheses/
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例 1：
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

示例 2：
输入：n = 1
输出：["()"]
 
提示：
1 <= n <= 8

*/


/**
 * 从左括号开始加字符, 左括号的个数一定要大于等于右括号, 最终就是符合规则的字符串
 * 循环
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let result = [{
        val: '(',
        l: 1,
        r: 0
    }]
    for (let i = 1; i < n * 2; i++){
        let tmp = []
        result.forEach(item => {
            if (item.l < n) {
                tmp.push({
                    val: item.val + '(',
                    l: item.l + 1,
                    r: item.r
                })
            }
            if (item.l > item.r && item.r < n) { // 可以用(或)
                tmp.push({
                    val: item.val + ')',
                    l: item.l,
                    r: item.r + 1
                })
            }
        })
        result = tmp
    }
    return result.map(item => item.val)
};
// 递归 更快更省内存
var generateParenthesis1 = function(n) {
    let result = []
    getParenthesis('', n, n)
    function getParenthesis(str, l, r) {
        if (!l && !r) {
            return result.push(str)
        }
        if (l) {
            getParenthesis(str + '(', l - 1, r)
        }
        if (l < r && r) {
            getParenthesis(str + ')', l, r - 1)
        }
    }
    return result
};

console.log(JSON.stringify(generateParenthesis1(14)))