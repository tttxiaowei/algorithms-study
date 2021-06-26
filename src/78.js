/*
https://leetcode-cn.com/problems/subsets/
78. 子集
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：
输入：nums = [0]
输出：[[],[0]]

提示：
1 <= nums.length <= 10
-10 <= nums[i] <= 10
nums 中的所有元素 互不相同
*/

/**
 * 递归
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    function dfs(arr) {
        let len = arr.length
        if (len === 1) {
            return [[arr[0]]]
        }
        let res = [[arr[0]]]
        dfs(arr.slice(1)).forEach(item => {
            res.push(item, [arr[0], ...item])
        });
        return res
    }
    dfs(nums)
    return [[], ...dfs(nums)]
};


/**
 * 动态规划
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets1 = function(nums) {
    let len = nums.length
    let prev = [[nums[0]]]
    for (let i = 1; i < len; i++) {
        prev = [[nums[i]], ...prev, ...prev.map(item => [nums[i], ...item])]
    }
    return [[], ...prev]
};


console.log(JSON.stringify(subsets([1, 2, 3])))
console.log(JSON.stringify(subsets1([1, 2, 3])))