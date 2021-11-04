/*
https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
4. 寻找两个正序数组的中位数
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数 。

示例 1：
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

示例 2：
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

示例 3：
输入：nums1 = [0,0], nums2 = [0,0]
输出：0.00000

示例 4：
输入：nums1 = [], nums2 = [1]
输出：1.00000

示例 5：
输入：nums1 = [2], nums2 = []
输出：2.00000

提示：
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？
*/


/**
 * 普通做法，找到两个数组长度一半的地方，就是中位数 
 * 时间复杂度O(m+n)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    let len1 = nums1.length;
    let len2 = nums2.length;
    let pos = (len1 + len2 + 2) >> 1;
    // console.log(pos)
    let i = j = 0;
    let arr = [];
    while (arr.length < pos) {
        if (i >= len1) {
            arr.push(nums2[j]);
            j++;
            continue;
        }
        if (j >= len2) {
            arr.push(nums1[i]);
            i++;
            continue;
        }
        if (nums1[i] <= nums2[j]) {
            arr.push(nums1[i]);
            i++;
        } else {
            arr.push(nums2[j]);
            j++;
        }
    }
    // console.log(arr);
    if ((len1 + len2 ) % 2) { // 奇数
        return arr[pos - 1];
    } else {
        return (arr[pos - 1] + arr[pos - 2]) / 2;
    }
};


/**
 * 普通做法，找到两个数组长度一半的地方，就是中位数 
 * 时间复杂度O(m+n)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays2 = function(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    if (!m && !n) {
        return 0
    }
    if (!n && m === 1) {
        return nums1[0]
    }
    if (!m && n === 1) {
        return nums2[0]
    }

    let r1 = m >> 1
    let r2 = n >> 1
    let l1 = l2 = 0

    let mid1 = (l1 + r1) >> 1
    let mid2 = (l2 + r2) >> 1
    
    // while (r1 + r2)
    if (nums1[mid1] < nums2[mid2]) {
        l1 
    } else if (nums1[mid1] > nums2[mid2]) {

    } else { // 相等
        
    }



    return 1
};


console.time()
// for (let i = 0; i < 1000000; i++) {
//     findMedianSortedArrays2([1], [1])
// }
// console.log(JSON.stringify(findMedianSortedArrays2([1, 3], [2]))) // 2
console.log(JSON.stringify(findMedianSortedArrays2([1, 2], [3, 4]))) // 2.5
// console.log(JSON.stringify(findMedianSortedArrays2([0, 0], [0, 0]))) // 0
// console.log(JSON.stringify(findMedianSortedArrays2([], [1]))) // 1
// console.log(JSON.stringify(findMedianSortedArrays2([2], []))) // 2
console.timeEnd()
