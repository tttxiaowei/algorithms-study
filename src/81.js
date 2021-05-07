/** 
力扣序号81
https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/

假设按照升序排序的数组在预先未知的某个点上进行了旋转。
( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。
编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

示例 1:
输入: nums = [2,5,6,0,0,1,2], target = 0
输出: true

示例 2:
输入: nums = [2,5,6,0,0,1,2], target = 3
输出: false
*/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    let len = nums.length;
    let left = 0;
    let right = len - 1;
    while (left < right && nums[left] === nums[right]) { // 和12.js中元素无重复解法的区别，先去掉末尾重复的
        right--;
    }
    while(left <= right) {
        if (nums[left] === target) {
            return true;
        }
        if (nums[right] === target) {
            return true;
        }
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            return true;
        }
        if (nums[mid] < target) {
            if (nums[right] > nums[mid] && nums[right] < target) {
                right = mid - 1;
            } else {
               left = mid + 1;
            }
        } else {
            if (nums[right] < nums[mid] && nums[right] > target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
};

console.log(search([1], 1));