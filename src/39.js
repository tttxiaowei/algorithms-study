
/*
力扣序号39. 组合总和
https://leetcode-cn.com/problems/combination-sum/
给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的数字可以无限制重复被选取。
说明：
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 

示例 1：
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]

示例 2：
输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
 
提示：
1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都是独一无二的。
1 <= target <= 500
*/

/**
 * 递归
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let len = candidates.length
    if (!len) {
        return []
    }
    let res = []
    for (let i = 0; i < len; i++) {
        let currVal = candidates[i]
        if (currVal === target) {
            res.push([currVal])
        } else if (currVal < target) {
            let n = 1
            while (n * currVal < target) {
                combinationSum(candidates.slice(i + 1), target - n * currVal).forEach(item => {
                    res.push(new Array(n).fill(currVal).concat(item))
                })
                n++
            }
            if (n * currVal === target) {
                res.push(new Array(n).fill(currVal))
            }
        }
    }
    return res
};

/**
 * 回溯
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum1 = function(candidates, target) {
    const ans = [];
    const len = candidates.length
    const dfs = (target, combine, idx) => {
        for (let i = idx; i < len; i++) {
            let currVal = candidates[i]
            if (target === currVal) {
                ans.push([...combine, currVal])
            } else if (target > currVal) {
                // console.log('递归之前：', JSON.stringify([...combine, currVal]), '剩余：', target - currVal)
                dfs(target - currVal, [...combine, currVal], i)
                // console.log('递归之后：', JSON.stringify([...combine, currVal]), '剩余：', target - currVal)
            }
        }
    }
    dfs(target, [], 0);
    return ans;
};
console.log(JSON.stringify(combinationSum1([2, 3, 6, 7], 7)))