/**
力扣序号9
https://leetcode-cn.com/problems/palindrome-number/

给你一个整数 x ，如果 x 是一个回文整数，返回 ture ；否则，返回 false 。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

示例 1：
输入：x = 121
输出：true

示例 2：
输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

示例 3：
输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。

示例 4：
输入：x = -101
输出：false
 
 * 
 * 
 */

 /**
 * 数字转成字符串再处理
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome1 = function(x) {
    if (x < 0) {
        return false;
    }
    x = String(x);
    let end = x.length - 1;
    let start = 0;
    while (end > start) {
        if (x[start] !== x[end]) {
            return false;
        }
        end--;
        start++;
    }
    return true;
};

/**
 * 反转一半数字, 比较是否相同
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome2 = function(x) {
    if (x < 0 || (x && x % 10 === 0)) {
        return false;
    }
    let rev = 0;
    while(x > rev) { // 当原始数字小于或等于反转后的数字时，就意味着我们已经处理了一半位数的数字了
        let pop = x % 10;
        x = Math.trunc(x / 10);
        rev = rev * 10 + pop;
    }
    return rev === x || x === Math.trunc(rev / 10);
};