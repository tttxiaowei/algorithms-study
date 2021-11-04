/*
https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
4. 寻找两个正序数组的中位数
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

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
    let len1 = nums1.length;
    let len2 = nums2.length;
    let k = (len1 + len2 + 2) >> 1;
    let l1 = 0;
    let r1 = len1 - 1;
    let l2 = 0;
    let r2 = len2 - 1;
    let rr1 = rr2 = -1;
    if (!len1) {
        rr2 = k - 1;
    } else if (!len2) {
        rr1 = k - 1;
    } else {
        while (k > 0) {
            // console.log(k, r1, r2);
            let index = (k >> 1) - 1;
            r1 = rr1 === -1 ? index : rr1 + index 
            r2 = rr1 === -1 ? index : rr2 + index 
            if (nums1[r1] < nums2[r2]) {
                rr1 = r1
            } else {
                rr2 = r2
            }
            k -= (index + 1)
        }
    }
    // console.log('result:', rr1, rr2)
    if ((len1 + len2 ) % 2) { // 奇数
        return getMaxVal(nums1, rr1, nums2, rr2);
    } else {
        let max1 = max2 = 0;
        max1 = getMaxVal(nums1, rr1, nums2, rr2);
        if (max1 === nums1[rr1]) {
            max2 = getMaxVal(nums1, rr1 - 1, nums2, rr2);
        } else {
            max2 = getMaxVal(nums1, rr1, nums2, rr2 - 1);
        }
        return (max1 + max2) / 2;
    }

    function getMaxVal(arr1, index1, arr2, index2) {
        if (index1 < 0 || index1 >= arr1.length) {
            return arr2[index2];
        } else if (index2 < 0 || index2 >= arr2.length) {
            return arr1[index1];
        } else {
            return Math.max(arr1[index1], arr2[index2]);
        }
    }
}




/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays3 = function(nums1, nums2) {
    let len1 = nums1.length;
    let len2 = nums2.length;
    if (!len1 && !len2) {
        return 0
    }
    let k = (len1 + len2 + 2) >> 1
    let l1 = l2 = 0
    
    while (k) {
        if (l1 === len1) {
            l2 += k 
            break
        }
        if (l2 === len2) {
            l1 += k 
            break
        }
        let d = (k + 1) >> 1
        let r1 = l1 + d - 1
        let r2 = l2 + d - 1
        if (r1 >= len1) {
            r1 = len1 - 1
        }
        if (r2 >= len2) {
            r2 = len2 - 1
        }
        if (nums1[r1] >= nums2[r2]) {
            k -= r2 - l2 + 1
            l2 = r2 + 1
        } else {
            k -= r1 - l1 + 1
            l1 = r1 + 1
        }
    }
    let last1, last2
    if (!l1) {
        last1 = nums2[l2 - 1]
        last2 = nums2[l2 - 2]
    } else if (!l2) {
        last1 = nums1[l1 - 1]
        last2 = nums1[l1 - 2]
    } else {
        if (nums1[l1 - 1] === nums2[l2 - 1]) {
            last1 = last2 = nums1[l1 - 1]
        } else if (nums1[l1 - 1] < nums2[l2 - 1]) {
            last1 = nums2[l2 - 1]
            last2 = Math.max(nums1[l1 - 1], l1 > 1 ? nums1[l1 - 2] : 0, l2 > 1 ? nums2[l2 - 2] : 0)
        } else {
            last1 = nums1[l1 - 1]
            last2 = Math.max(l1 > 1 ? nums1[l1 - 2] : 0, nums2[l2 - 1], l2 > 1 ? nums2[l2 - 2]: 0)
        }
    }
    if ((len1 + len2) % 2) { // 奇数
        return last1
    } else {
        return (last1 + last2) / 2
    }
}
console.log(findMedianSortedArrays3([1], [2, 3, 4])) // 2.5
console.log(findMedianSortedArrays3([1, 3], [2])) // 2
console.log(findMedianSortedArrays3([1, 2], [3, 4])) // 2.5
console.log(findMedianSortedArrays3([0, 0], [0, 0])) // 0
console.log(findMedianSortedArrays3([], [2])) // 2
console.log(findMedianSortedArrays3([2], [])) // 2