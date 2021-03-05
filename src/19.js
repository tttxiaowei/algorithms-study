/*
力扣序号4
https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
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
    let k = (len1 + len2 + 2) >> 1;4
    let l1 = 0;
    let r1 = len1 - 1;
    let l2 = 0;
    let r2 = len2 - 1;
    let ll1 = ll2 = -1
    while (k > 0) {
        let mid1 = (l1 + r1 + 1) >> 1;
        let mid2 = (l2 + r2 + 1) >> 1;
        if (!nums1[mid1]) {
            mid1 -= 1;
        }
        if (!nums2[mid2]) {
            mid2 -= 1;
        }
        if (nums1[mid1] >= nums2[mid2]) {
            k = k - (mid2 - l2);
            r1 = mid1;
            l2 = mid2;
            ll2 = mid2 - 1;
        } else {
            k = k - (mid1 - l1);
            r2 = mid2;
            l1 = mid1;
            ll1 = mid1 - 1;
        }

        if (l1 === -1 || r1 === -1 || l1 === r1) {
            ll2 += k;
            if (k !== 0) {
                ll2 -= 1
            }
            break;
        }
        if (l2 === -1 || r2 === -1 || l2 ===r2) {
            ll1 += k;
            if (k !== 0) {
                ll1 -= 1
            }
            break;
        }
    }

    console.log(k, ll1, ll2)
    if ((len1 + len2 ) % 2) { // 奇数
        return Math.max(nums1[ll1] || 0, nums2[ll2] || 0);
    } else {
        let max1, max2;
        if (ll1 === -1) {
            return (nums2[ll2] + nums2[ll2 - 1]) / 2;
        }
        if (ll2 === -1) {
            return (nums1[ll1] + nums1[ll1 - 1]) / 2;
        }
        if (nums1[ll1] > nums2[ll2]) {
            max1 = nums1[ll1];
            max2 = Math.max(nums1[ll1 - 1] || 0, nums2[ll2] || 0);
        } else {
            max1 = nums2[ll2];
            max2 = Math.max(nums2[ll2 - 1] || 0, nums1[ll1] || 0);
        }
        return (max1 + max2) / 2;
    }
}
console.log(findMedianSortedArrays2([1,2], [3,4]))