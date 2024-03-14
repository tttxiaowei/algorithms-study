/*
https://leetcode.cn/problems/rotate-array/?envType=study-plan-v2&envId=top-interview-150
189. 轮转数组
给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

示例 1:
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]

示例 2:
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
 
提示：
1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
0 <= k <= 105

进阶：
尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let len = nums.length
    k = k % len
    
    const i = len - k
    nums.unshift(...nums.splice(i, len))
    return nums
};

var rotate1 = function(nums, k) {
    let len = nums.length
    k = k % len

    if (!k) {
        return
    }

    let baseIndex = k - 1
    let arr = []
    for (let i = 0; i < len; i++) {
        let toIndex = ++baseIndex
        if (toIndex === len) {
            toIndex = 0
            baseIndex = 0
        }
        arr[toIndex] = nums[i]
    }
    nums.splice(0, len, ...arr)
    return nums
};

var rotate2 = function(nums, k) {
    let len = nums.length
    k = k % len

    if (!k) {
        return
    }

    let count = 0
    for (let i = 0; i < len; i++) {
        let next = i + k
        let last = nums[i]
        while(next !== i) {
            if (next >= len) {
                next -= len
            }
            let temp = nums[next]
            nums[next] = last
            last = temp
            count++
            if (count === len) {
                break
            }
            if (next === i) {
                break
            }
            next += k
        }
        if (count === len) {
            break
        }
    }
    return nums
};

// console.log(rotate([1,2,3,4,5,6,7], 3))
// console.log(rotate1([1,2,3,4,5,6,7], 3))
// console.log(rotate2([1,2,3,4,5,6,7], 3))

// console.log(rotate([1,2,3,4,5,6], 2))
// console.log(rotate1([1,2,3,4,5,6], 2))
// console.log(rotate2([1,2,3,4,5,6], 2))

// console.log(rotate([1,2,3,4,5,6], 4))
// console.log(rotate1([1,2,3,4,5,6], 4))
// console.log(rotate2([1,2,3,4,5,6], 4))