/** 
力扣序号154
https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

请找出其中最小的元素。

注意数组中可能存在重复的元素。

示例 1：

输入: [1,3,5]
输出: 1
示例 2：

输入: [2,2,2,0,1]
输出: 0
说明：

这道题是 寻找旋转排序数组中的最小值 的延伸题目。
允许重复会影响算法的时间复杂度吗？会如何影响，为什么？

*/


/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let len = nums.length;
    let left = 0;
    let right = len - 1;
    while(nums[left] === nums[right] && right > 0) {
        right--;
    }
    if (!right) {
        return nums[0];
    }
    while(left < right) {
        let mid = (left + right + 1) >> 1;
        if (nums[left] > nums[right]) {
            if (nums[mid] < nums[mid -1]) {
                return nums[mid];
            } else if (nums[right] < nums[mid]) {
                left = mid;
            } else {
                right = mid;
            }
        } else {
            return nums[left];
        }
    }
};

console.log(findMin([1, 1]));