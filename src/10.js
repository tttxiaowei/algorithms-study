/**
力扣序号704
https://leetcode-cn.com/problems/binary-search/

 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。

示例 1:
输入: [1,3,5,6], 5
输出: 2

示例 2:
输入: [1,3,5,6], 2
输出: 1

示例 3:
输入: [1,3,5,6], 7
输出: 4

示例 4:
输入: [1,3,5,6], 0
输出: 0
 */

 
/**
 * 循环暴力超找，不推荐
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert1 = function(nums, target) {
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        if (nums[i] === target || nums[i] > target) {
            return i;
        }
    }
    return len;
};

/**
 * 二分法查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert2 = function(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        let mid = Math.floor((right - left) / 2) + left;
        if (target === nums[mid]) {
            return mid;
        } else if (target < nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

console.log(searchInsert2([1,3,5,6], 2));