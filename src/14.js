/**
力扣序号14
https://leetcode-cn.com/problems/longest-common-prefix/

 编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

示例 1：
输入：strs = ["flower","flow","flight"]
输出："fl"

示例 2：
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。

提示：
0 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 仅由小写英文字母组成
 */


/**
 * 纵向查找
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix1 = function(strs) {
    let commonPrefix = '';
    let total = strs.length;
    if (total) {
        let len = strs[0].length;
        for (let i = 0; i < len; i++) {
            let j = 1;
            for (; j < total; j++) {
                if (strs[0][i] !== strs[j][i]) {
                    break;
                }
            }
            if (j === total) {
                commonPrefix += strs[0][i];
            } else {
                break;
            }
        }
    }
    return commonPrefix;
};



/**
 * 横向查找
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix2 = function(strs) {
    function getLongPrefix(str1, str2) {
        let len = str1.length;
        let i = 0;
        for (; i < len; i++) {
            if (str1[i] !== str2[i]) {
                break;
            }
        }
        return str1.slice(0, i);
    }

    if (strs == null) {
        return '';
    }
    let commonPrefix = strs[0] || '';
    let total = strs.length;
    for (let i = 1; i < total; i++) {
        let prefix = getLongPrefix(commonPrefix, strs[i]);
        if (prefix.length) {
            if (prefix.length < commonPrefix.length) {
                commonPrefix = prefix;
            }
        } else {
            commonPrefix = '';
            break
        }
    }
    return commonPrefix;
};

console.log(longestCommonPrefix2(["flower","flow","flight"]))