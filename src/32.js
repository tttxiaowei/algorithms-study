
/*
力扣序号32. 最长有效括号
https://leetcode-cn.com/problems/longest-valid-parentheses/
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

示例 1：
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

示例 2：
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"

示例 3：
输入：s = ""
输出：0
 
提示：
0 <= s.length <= 3 * 104
s[i] 为 '(' 或 ')'
*/

/**
 * 动态规划
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (!s) {
        return 0
    }
    let len = s.length
    let dp = new Array(len).fill(0)
    for (let i = 1; i < len; i++) {
        if (s[i] === ')') {
           if (s[i - 1] === '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2
           } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
                dp[i] = dp[i - 1] + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0) + 2
           }
        }
    }
    return dp.sort((a, b) => (b - a))[0]
};

/**
 * 栈
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses1 = function(s) {
    if (!s) {
        return 0
    }
    let len = s.length
    let maxans = 0
    let list = [-1]
    for (let i = 0; i < len; i++) {
        if (s[i] === '(') {
            list.push(i)
        } else {
            list.pop()
            if (!list.length) {
                list.push(i)
            } else {
                maxans = Math.max(maxans, i - list[list.length - 1])
            }
        }
    }
    return maxans
};

/**
 * 遍历
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses2 = function(s) {
    if (!s) {
        return 0
    }
    let len = s.length
    let maxans = left = right = 0
    for (let i = 0; i < len; i++) {
        if (s[i] === '(') {
            left++
        } else {
            right++
        }
        if (left === right) {
            maxans = Math.max(maxans, 2 * right)
        } else if (right > left) {
            left = right = 0
        }
    }
    left = right = 0
    for (let i = len - 1; i > -1; i--) {
        if (s[i] === '(') {
            left++
        } else {
            right++
        }
        if (left === right) {
            maxans = Math.max(maxans, 2 * right)
        } else if (right < left) {
            left = right = 0
        }
    }

    return maxans
};

console.log(JSON.stringify(longestValidParentheses2('(()'))) // 2
console.log(JSON.stringify(longestValidParentheses2('(()(((()'))) // 2
console.log(JSON.stringify(longestValidParentheses2(')()())'))) // 4
console.log(JSON.stringify(longestValidParentheses2(')()())'))) // 4
console.log(JSON.stringify(longestValidParentheses2('()(())'))) // 6
console.log(JSON.stringify(longestValidParentheses2('(()()))'))) // 6