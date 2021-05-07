/*
力扣序号643. 子数组最大平均数 I
https://leetcode-cn.com/problems/maximum-average-subarray-i/

给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。

示例：
输入：[1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 

提示：
1 <= k <= n <= 30,000。
所给数据范围 [-10,000，10,000]。
 
*/


/**
 * 最初的做法，不可取，循环太多耗时太长
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage1 = function(nums, k) {
    let len = nums.length;
    let maxSum;
    for (i = k - 1; i <= len; i++) {
        let sum = 0;
        for (j = 0; j < k; j++) { // 每次都重新求和，耗时太长
             sum += nums[i - j];
        }
        if (maxSum == null || sum > maxSum) {
            maxSum = sum;
        }
    }
    return maxSum / k;
};


/**
 * 滑动窗口做法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage2 = function(nums, k) {
    let sum = 0;
    for(let i = 0; i < k; i++) {
        sum += nums[i];
    }
    let maxSum = sum;
    let len = nums.length;
    for (let i = k; i <= len; i++) {
        sum = sum - nums[i - k] + nums[i];
        if (sum > maxSum) {
            maxSum = sum;
        }
    }
    return maxSum / k;    
};


/**
 * preSum 做法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage3 = function(nums, k) {
    let len = nums.length;
    for(let i = 1; i < len; i++) {
        nums[i] += nums[i - 1];
    }
    let maxSum = sum = nums[k - 1];
    for(let i = k; i <= len; i++) {
        sum = nums[i] - nums[i - k];
        if (sum > maxSum) {
            maxSum = sum;
        }
    }
    return maxSum / k;    
};

console.log(findMaxAverage3([1,12,-5,-6,50,3], 4))