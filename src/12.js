/**
力扣序号33
https://leetcode-cn.com/problems/search-in-rotated-sorted-array/

升序排列的整数数组 nums 在预先未知的某个点上进行了旋转（例如， [0,1,2,4,5,6,7] 经旋转后可能变为 [4,5,6,7,0,1,2] ）。
请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

示例 1：
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

示例 2：
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

示例 3：
输入：nums = [1], target = 0
输出：-1

提示：
1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
nums 中的每个值都 独一无二
nums 肯定会在某个点上旋转
-10^4 <= target <= 10^4
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search1 = function(nums, target) {
    let len = nums.length;
    let left = 0;
    let right = len - 1;
    while(left <= right) {
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[left] === target) {
            return left;
        }
        if (nums[right] === target) {
            return right;
        }
        if (nums[left] < nums[right]) { // 说明是正序了
            if (target < nums[left] || target > nums[right]) {
                return -1;
            }
            if (nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {    // 还是逆序
            if (nums[right] > target) { // 应该在右边
                if (nums[mid] > target) {
                    if (nums[mid] > nums[right]) {
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                } else {
                    left = mid + 1;
                }
            } else { // 应该在左边
                if (nums[mid] > target) {
                    right = mid - 1;
                } else {
                    if (nums[mid] > nums[right]) {
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                }
            }
        }
    }
    return -1;
};


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search2 = function(nums, target) {
    let len = nums.length;
    let left = 0;
    let right = len - 1;
    while(left <= right) {
        if (nums[left] === target) {
            return left;
        }
        if (nums[right] === target) {
            return right;
        }
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            return mid;
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
    return -1;
};

console.log(search2([5,1,2,3,4], 1));
// console.log(search2([4,5,6,7,0,1,2], 0));
// console.log(search2([8,9,2,3,4], 9));
// console.log(search2([4,5,6,7,0,1,2], 3));
// console.log(search2([4,5,6,7,8,1,2,3], 8));