/*
https://leetcode-cn.com/problems/minimum-window-substring/
76. 最小覆盖子串
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

示例 1：
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"

示例 2：
输入：s = "a", t = "a"
输出："a"

提示：
1 <= s.length, t.length <= 105
s 和 t 由英文字母组成

进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？
*/

/**
 * 滑动窗口
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let result = ''
    let m = s.length
    let n = t.length
    let sHash = {}
    let tHash = {}
    let expectChar
    for (let i = 0; i < n; i++) { // 统计 t 中各字符串出现的次数tHash
        if (tHash[t[i]]) {
            tHash[t[i]]++
        } else {
            tHash[t[i]] = 1
        }
    }
    let left = right = null
    for (let i = 0; i < m; i++) { // 遍历字符串 s， 统计 t 中出现字符的出现次数sHash
        if (tHash[s[i]]) { // 只统计当前字符在 t 中存在的情况
            right = i
            if (left == null) { // 找到 s 中第一个在 t 中存在的字符
                left = i
            }
            if (sHash[s[i]] == null) { // 修改sHash
                sHash[s[i]] = 1
            } else {
                sHash[s[i]]++
            }

            // 在第一次找到满足tHash的s[left, right]前，需要调用isInclude比较sHash和tHash
            // 在找到一次之后，只要判断上一次最后移除了哪个字符，导致s[left, right]不再满足tHash了， 就可以判断已经找到了符合要求的s[left, right]
            if (expectChar ? expectChar === s[i] : sHash[s[i]] >= tHash[s[i]] && isInclude()) { 
                while (true) {
                    if (!result.length || right - left + 1 < result.length) { // 如果新s[left, right]比现在的之前的result还短，就替换result
                        result = s.slice(left, right + 1)
                        if (result.length === n) {
                            return result
                        }
                    }

                    sHash[s[left]]--
                    if (sHash[s[left]] < tHash[s[left]]) { // 如果移除s[left]后导致s[left, right]不再满足
                        expectChar = s[left] // 记录s[left]
                        left++
                        while (!tHash[s[left]]) { // 一直缩小left到s[left]在t中
                            left++
                        }
                        break
                    } else {
                        left++
                        while (!tHash[s[left]]) {
                            left++
                        }
                    }
                }
            }
        }
    }

    function isInclude() {
        let include = true
        for (let j = 0; j < n; j++) {
            let str = t[j]
            if (!sHash[str] || tHash[str] > sHash[str]) {
                include = false
                break
            }
        }
        return include
    }
    return result
};

console.log(minWindow('abwefgewcwaefgcf', 'cae'))
console.log(minWindow('ADOBECODEBANC', 'ABC'))