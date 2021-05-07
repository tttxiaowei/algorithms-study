/**
力扣序号28
https://leetcode-cn.com/problems/implement-strstr/

 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

示例 1:
输入: haystack = "hello", needle = "ll"
输出: 2

示例 2:
输入: haystack = "aaaaa", needle = "bba"
输出: -1
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (!needle) {
        return 0;
    } 
    let len1 = haystack.length;
    let lastIndex = needle.length - 1;
    for (let i = j = 0; i < len1; i++) {
        while (haystack[i + j] === needle[j]) {
            if (j === lastIndex) {
                return i;
            } else {
                j++;
            }
        }
        j = 0;
    }
    return -1;
};

console.log(strStr('hello', 'lo'));