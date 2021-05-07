/**
力扣序号34
https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。

示例 1：
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

示例 2：
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

示例 3：
输入：nums = [], target = 0
输出：[-1,-1]
 */

/**
 * 二分法， 直接从mid忘前后找相同值
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchRange1 = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let startPos, endPos;
    while (left <= right) {
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            startPos = endPos = mid;
            while (nums[startPos] === target) { // 直接从mid忘前后找相同值
                startPos--;
            }
            while (nums[endPos] === target) {
                endPos++;
            }
            return [startPos + 1, endPos - 1];
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [-1, -1];
};




/**
 * 二分法，分别找第一个和最后一个值
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange2 = function(nums, target) {
    let len = nums.length;
    if (!len) {
        return [-1, -1];
    }
    let firstIndex = findFirstPosition(nums, target);
    if (firstIndex === -1) {
        return [-1, -1];
    }
    return [firstIndex, findLastPosition(nums, target)];
};

/**
 * 二分法，找第一个值
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findFirstPosition = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        console.log('first: ', String(nums.slice(left, right + 1)));
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            right = mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if (nums[left] === target) {
        return left;
    }
    return -1;
}

/**
 * 二分法，找最后一个值
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findLastPosition = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        console.log('last: ', String(nums.slice(left, right + 1)));
        let mid = (left + right + 1) >> 1;
        if (nums[mid] === target) {
            left = mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if (nums[left] === target) {
        return left;
    }
    return -1;
}




/**
 * 二分法， 官方推荐
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange3 = function(nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    } 
    return ans;
};

/**
 * 二分法， 一个函数找到第一个和最后一个
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const binarySearch = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}


console.log(searchRange3([0,1,2,3,4,4,4,5], 4));