/*
力扣序号15. 三数之和
https://leetcode-cn.com/problems/3sum/
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]n

示例 2：
输入：nums = []
输出：[]

示例 3：
输入：nums = [0]
输出：[]
 
提示：
0 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const len = nums.length
    if (len < 3) {
        return []
    }
    const result = []
    nums = nums.sort((a, b) => (a - b))
    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) {
            break
        }
        if (nums[i] === nums[i - 1]) {
            continue
        }
        let left = i + 1
        let right = len - 1
        while(left < right) {
            let leftVal= nums[left]
            let rightVal= nums[right]
            let sum = nums[i] + leftVal + rightVal
            if (!sum) { // 和为0
                result.push([nums[i], leftVal, rightVal])
            } 
            if (sum <= 0) {
                left++
                while (leftVal === nums[left] && left < right) {
                    left++
                }
            }
            if (sum >= 0) {
                right--
                while (rightVal === nums[right] && left < right) {
                    right--
                }
            }
        }
    }
    return result
};

console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4])))