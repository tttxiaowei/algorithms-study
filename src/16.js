/** 
力扣序号300 
https://leetcode-cn.com/problems/longest-increasing-subsequence/

 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 
示例 1：
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

示例 2：
输入：nums = [0,1,0,3,2,3]
输出：4

示例 3：
输入：nums = [7,7,7,7,7,7,7]
输出：1

提示：
1 <= nums.length <= 2500
-104 <= nums[i] <= 104

进阶：
你可以设计时间复杂度为 O(n2) 的解决方案吗？
你能将算法的时间复杂度降低到 O(n log(n)) 吗?

*/


/**
 * 暴力解法
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS1 = function(nums) {
    let len = nums.length;
    if (len <= 1) {
        return len;
    }
    let dp = [];
    let maxLen = 1;
    for (let i = 0; i < len; i++) {
        dp[i] = 1;
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
};

/**
 * 贪心加二分法
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS2 = function(nums) {
    let n = nums.length;
    if (n <= 1) {
        return n;
    }
    let len = 1;
    let dp = [undefined, nums[0]];
    for (let i = 1; i < n; i++) {
        if (nums[i] > dp[len]) {
            dp.push(nums[i]);
            len++;
        } else if (nums[i] < dp[len]) {
            let left = 1;
            let right = len;
            let pos = 0;
            while(left <= right) {
                let mid = (left + right) >> 1;
                if (dp[mid] < nums[i]) {
                    left = mid + 1;
                    pos = mid;
                } else {
                    right = mid - 1;
                }
            }
            dp[pos + 1] = nums[i];
        }
        console.log(String(dp))
    }
    return len;
};


console.log(lengthOfLIS2([3,5,6,2,5,4,19,5,6,7,12]));