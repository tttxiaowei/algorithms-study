/**
 力扣序号46. 全排列
 https://leetcode-cn.com/problems/permutations/
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

示例 2：
输入：nums = [0,1]
输出：[[0,1],[1,0]]

示例 3：
输入：nums = [1]
输出：[[1]]

提示：
1 <= nums.length <= 6
-10 <= nums[i] <= 10
nums 中的所有整数 互不相同
**/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let len = nums.length
    let ans = []

    function per(arr) {
        if (arr.length <= 1) {
            return [[...arr]]
        }
        let res = []
        for (let i = 0; i < arr.length; i++) {
            per(arr.slice(0, i).concat(arr.slice(i + 1))).forEach(item => {
                item.unshift(arr[i])
                res.push(item)
            })
        }
        return res
    }

    per(nums)
    return ans
};

console.log(JSON.stringify(permute([1,2,3])))
