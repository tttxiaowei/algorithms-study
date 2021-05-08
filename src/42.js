/**
 力扣序号42. 接雨水
 https://leetcode-cn.com/problems/trapping-rain-water/
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

示例 1：
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

示例 2：
输入：height = [4,2,0,3,2,5]
输出：9

提示：
n == height.length
0 <= n <= 3 * 104
0 <= height[i] <= 105
**/


/**
 * 暴力法
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let len = height.length
    if (len < 3) {
        return 0
    }
    let peak = []
    let peakVal = []
    let area = 0
    let leftIndex
    for (let i = 0; i < len; i++) { // 找到所有高峰点
        if (leftIndex == null) {
            if (height[i] > height[i + 1]) {
                leftIndex = i
            }
        } else {
            if (height[i] > height[i - 1] && (height[i] >= height[i + 1] || i === len - 1)) {
                peak.push(leftIndex, i)
                peakVal.push(height[leftIndex], height[i])
                leftIndex = i
            }
        }
    }
    for (let i = 0; i < peakVal.length; i++) { // 计算每个区间的面积
        if (peakVal[i] <= peakVal[i + 1]) { // 左边小于右边，直接计算面积
            calc(i, i + 1)
        } else { // 左边大于右边
            let j = i + 2
            for (; j < peakVal.length; j++) { // 找到第一个比i高的点
                if (peakVal[i] <= peakVal[j]) {
                    calc(i, j)
                    i = j - 1
                    break
                }
            }
            if (j === peakVal.length) { // 没找到更高的节点
                let maxIndex = i + 1
                let maxVal = peakVal[maxIndex]
                for (let k = i + 2; k < peakVal.length; k++) {
                    if (peakVal[k] > maxVal) {
                        maxIndex = k
                        maxVal = peakVal[k]
                    }
                }
                calc(i, maxIndex)
                i = maxIndex - 1
            }
        }
    }

    function calc(startIndex, endIndex) {
        let minVal = Math.min(peakVal[startIndex], peakVal[endIndex])
        for (let i = peak[startIndex] + 1; i < peak[endIndex]; i++) {
            let k = minVal - height[i]
            if (k > 0) {
                area += k
            }
        }
    }
    return area
};


/**
 * 动态规划法
 * @param {number[]} height
 * @return {number}
 */
function trap1(height) {
    let len = height.length
    if (len < 3) {
        return 0
    }
    let area = 0
    let leftMax = new Array(len)
    let rightMax = new Array(len)
    rightMax[len - 1] = height[len - 1]
    leftMax[0] = height[0]
    for (let i = 1; i < len; i++) { // 算出位置i左侧最大值
        leftMax[i] = Math.max(leftMax[i - 1], height[i])
    }
    for (let i = len - 2; i > -1; i--) { // 算出位置i右侧最大值
        rightMax[i] = Math.max(rightMax[i + 1], height[i])
    }
    for (let i = 1; i < len - 1; i++) {
        let a = Math.min(leftMax[i], rightMax[i]) - height[i]
        area += a
    }
    return area
}


/**
 * 单调栈
 * @param {number[]} height
 * @return {number}
 */
function trap2(height) {
    let len = height.length
    if (len < 3) {
        return 0
    }
    let ans = 0;
    const stack = [];
    const n = height.length;
    for (let i = 0; i < n; ++i) {
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            if (!stack.length) {
                break;
            }
            const left = stack[stack.length - 1];
            const currWidth = i - left - 1;
            const currHeight = Math.min(height[left], height[i]) - height[top];
            ans += currWidth * currHeight;
        }
        stack.push(i);
    }
    return ans;
}

console.log(trap2([4,2,0,3,2,5]))
