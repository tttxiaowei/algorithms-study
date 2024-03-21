/*
https://leetcode.cn/problems/gas-station/description/?envType=study-plan-v2&envId=top-interview-150
134. 加油站
在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。

示例 1:
输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出: 3
解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。

示例 2:
输入: gas = [2,3,4], cost = [3,4,3]
输出: -1
解释:
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。

提示:
gas.length == n
cost.length == n
1 <= n <= 105
0 <= gas[i], cost[i] <= 104
*/

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    const len = gas.length
    for (let start = 0; start < len; start++) {
        if (!gas[start] && cost[start]) {
            break
        }
        let count = 0
        let sumGas = 0
        let sumCost = 0
        for (let i = start; count < len;) {
            if (i === len) {
                i = 0
            }
            sumGas += gas[i]
            sumCost += cost[i]
            if (sumGas < sumCost) {
                if (count === len -1) {
                    return -1
                }
                start = i
                break
            }
            count++
            i++
        }
        if (count === len) {
            return start
        }
    }
    return -1
};


// console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]));
// console.log(canCompleteCircuit([2,3,4], [3,4,3]));
console.log(canCompleteCircuit([1,2,3,4,3,2,4,1,5,3,2,4], [1,1,1,3,2,4,3,6,7,4,3,1]));