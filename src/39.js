
/*
力扣序号31. 下一个排列
https://leetcode-cn.com/problems/next-permutation/
实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
必须 原地 修改，只允许使用额外常数空间。

示例 1：
输入：nums = [1,2,3]
输出：[1,3,2]

示例 2：
输入：nums = [3,2,1]
输出：[1,2,3]

示例 3：
输入：nums = [1,1,5]
输出：[1,5,1]

示例 4：
输入：nums = [1]
输出：[1]

提示：
1 <= nums.length <= 100
0 <= nums[i] <= 100
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    let index = nums.length - 1
    while (index) {
        if (nums[index] > nums[index - 1]) { // 找到后一位（index）大于前一位（index-1）的位置
            let neighbor, neighborIndex
            nums.slice(index).forEach((item, i) => { // 找到index到末尾中，大于且最接近index-1的值
                if (nums[index - 1] < item) {
                    if (neighbor == null || item < neighbor) {
                        neighbor = item
                        neighborIndex = i
                    } 
                }
            });
            ([nums[index - 1], nums[index + neighborIndex]] = [nums[index + neighborIndex], nums[index - 1]]) // 让index-1的变大
            nums.splice(index, nums.length, ...nums.slice(index).sort((a, b) => (a - b))) // 对index到末尾进行排序
            break
        }
        index--
    }
    if (!index) {
        nums.splice(0, nums.length, ...nums.sort((a, b) => (a - b)))
    }
    return nums
};

console.log(JSON.stringify(nextPermutation([5,4,7,5,3,2])))
console.log(JSON.stringify(nextPermutation([1,2,3])))
console.log(JSON.stringify(nextPermutation([1,3,2])))
console.log(JSON.stringify(nextPermutation([2,3,1])))