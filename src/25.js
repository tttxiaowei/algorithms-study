/*
力扣序号5. 最长回文子串
https://leetcode-cn.com/problems/longest-palindromic-substring/
给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

示例 2：
输入：s = "cbbd"
输出："bb"

示例 3：
输入：s = "a"
输出："a"

示例 4：
输入：s = "ac"
输出："a"
 
提示：
1 <= s.length <= 1000
s 仅由数字和英文字母（大写和/或小写）组成

*/

/**
 * 
 * 动态规划法
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const len = s.length
    if (len < 2) {
        return s
    }
    let maxStr = s[0]
    const dp = new Array(len)
    for (let k = 0; k < len; k++) {
        dp[k] = []
    } 
    for (let j = 1; j < len; j++) {
        for (let i = j; i >= 0; i--) {
            if (j - i <= 2) {
                if (s[i] === s[j]) {
                    dp[i][j] = true
                } 
            } else if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true
            }
            if (dp[i][j]) {
                maxStr = maxStr.length > (j - i + 1) ? maxStr : s.slice(i, j + 1)
            }
        }
    }
    return maxStr
};

/**
 * 
 * 中心扩展法
 * @param {string} s
 * @return {string}
 */
var longestPalindrome1 = function(s) {
    const len = s.length
    if (len < 2) {
        return s
    }
    let maxStr = s[0]
    for (let i = 0; i < len ;i++) {
        let str = s[i]
        let l = i - 1
        let r = i + 1
        while (s[i] === s[r]) { // 处理连续值相同的回文数
            str += s[r]
            r++
            i++
        }
        while (l >= 0 && r < len) {
            if (s[l] === s[r]) {
                str = s[l] + str + s[r]
                l--
                r++
            } else {
                break
            }
        }
        maxStr = maxStr.length > str.length ? maxStr : str
    }
    return maxStr
};
console.log(longestPalindrome1('1aaaaa1'))