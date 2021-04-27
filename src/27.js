/*
力扣序号10. 正则表达式匹配
https://leetcode-cn.com/problems/regular-expression-matching/
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 
示例 1：
输入：s = "aa" p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。

示例 2:
输入：s = "aa" p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。

示例 3：
输入：s = "ab" p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

示例 4：
输入：s = "aab" p = "c*a*b"
输出：true
解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。

示例 5：
输入：s = "mississippi" p = "mis*is*p*."
输出：false

提示：
0 <= s.length <= 20
0 <= p.length <= 30
s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
保证每次出现字符 * 时，前面都匹配到有效的字符

*/
/**
 * 递归
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if (!p && !s) {
        return true
    }
  
    const len = p.length
    let pos = 0
    let c = s[pos]
    let i = 0
    for (; i < len;) { // 遍历p
        if (!c) {
            break
        }
        let curr = p[i]
        let next = p[i + 1]
        if (!next) { // 遍历到最后一个p的字符
            if  (c === curr || curr === '.') {
                pos++
                i++
            } else {
                return false
            }
        } else if (next === '*') { // 下一个字符为*
            while(c === curr || curr === '.') {
                if (isMatch(s.slice(pos), p.slice(i + 2))) {
                    return true
                }
                pos++
                c = s[pos]
                if (!c) {
                    break
                }
            }
            i += 2
        } else { // 下一个字符为普通字符
            if (curr === '.' || c === curr) {
                pos++
                c = s[pos]
                if (!c) {
                    i++  
                    break
                }
            } else {
                return false
            }
            i++     
        }
    }
    if (i !== len) {
        if (/^(\S\*)*$/.test(p.slice(i))) {
            i = len
        }
    }
    return pos === s.length && i === len
};


/**
 * 递归
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch1 = function(s, p) {
    if (!p && !s) {
        return true
    }
  
    const len = p.length
    let pos = 0
    let c = s[pos]
    let i = 0
  
};

console.log(isMatch1('ab', '.*'))