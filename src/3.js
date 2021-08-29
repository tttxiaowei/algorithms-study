/*
力扣序号3. 无重复字符的最长子串
https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

示例 4:
输入: s = ""
输出: 0
 
提示：
0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成
*/

/**
 * 滑动窗口 + hash
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let len = s.length
    if (len < 2) {
        return len
    }
    let maxLen = 0
    let start = 0
    let hash = {}
    for (let end = 0; end < len; end++) {
        if (hash[s[end]] >= start) {                // 如果字符在hash中已存在, 并且索引要大于start, 说明当前字符在s[start, end]中重复了
            const dis = end - start
            maxLen = maxLen > dis ? maxLen : dis    // 更新最大子串长度
            start = hash[s[end]] + 1                // 更新左侧start索引
            if (maxLen >= len - start) {            // 优化: 此时如果之后的字符都不再重复, 长度为len - start, 所以这就是此时最大的值, 如果此时maxLen>=最大值, 直接返回
                return maxLen
            }
        }
        hash[s[end]] = end                          // 设置/更新hash中的索引
    }
    const dis = len - start                         // s遍历完之后再算一次, 以防for循环的最后一次循环没走if分支, 比如'abc'这种情况
    maxLen = maxLen > dis ? maxLen : dis
    return maxLen
};

console.time()
for (let i = 0; i < 1000000; i++) {
    lengthOfLongestSubstring('abcabcbb')
    lengthOfLongestSubstring('abc')
    lengthOfLongestSubstring('pwwkew')
    lengthOfLongestSubstring('bbbb')
    lengthOfLongestSubstring('')
}
console.log(JSON.stringify(lengthOfLongestSubstring('anviaj')))
console.log(JSON.stringify(lengthOfLongestSubstring('abcabcbb')))
console.log(JSON.stringify(lengthOfLongestSubstring('abc')))
console.log(JSON.stringify(lengthOfLongestSubstring('pwwkew')))
console.log(JSON.stringify(lengthOfLongestSubstring('dvdf')))
console.log(JSON.stringify(lengthOfLongestSubstring('bbbb')))
console.log(JSON.stringify(lengthOfLongestSubstring('')))
console.timeEnd()