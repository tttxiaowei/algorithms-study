/**
力扣序号20
https://leetcode-cn.com/problems/valid-parentheses/

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
 

示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false

示例 4：
输入：s = "([)]"
输出：false
 */

 
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let openList = ['(', '[', '{'];
    let openMap = {
        '(': ')',
        '[': ']',
        '{': '}',
    };
    let arr = [];
    let len = s.length;
    for (let i = 0; i < len; i++) {
        if (openList.includes(s[i])) {
            arr.push(s[i]);
        } else if (openMap[arr.pop()] !== s[i]) {
            return false;
        }
    }
    return !arr.length;
};

console.log(isValid("[()]"));