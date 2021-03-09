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
    let k = (len1 + len2 + 2) >> 1;
    let l1 = 0;
    let r1 = len1 - 1;
    let l2 = 0;
    let r2 = len2 - 1;
    let rr1 = rr2 = -1;
    while (k > 0) {
        // console.log(l1, r1, l2, r2)
        if (r1 >= len1 || l1 >= len1 || l1 > r1) {
            if (rr1 === -1) {
                rr1 = 0;
            } else if (rr2 === -1) {
                rr2 = 0;
            }
            rr2 = r2 = l2 + k;
            if(rr2 >= len2 - 1) {
                rr2 = len2 - 1
            }
            break
        } else if (r2 >= len2 || l2 >= len2 || l2 > r2) {
            if (rr1 === -1) {
                rr1 = 0;
            } else if (rr2 === -1) {
                rr2 = 0;
            }
            rr1 = r1 = l1 + k;
            if(rr1 >= len1 - 1) {
                rr1 = len1 - 1
            }
            break
        }
        let mid1 = (l1 + r1 + 1) >> 1;
        let mid2 = (l2 + r2 + 1) >> 1;
        if (nums1[mid1] >= nums2[mid2]) {
            k -= (mid2 - l2 + 1);
            rr2 = mid2;
            r1 = mid1 - 1;
            l2 = mid2 + 1;
        } else {
            k -= (mid1 - l1 + 1);
            rr1 = mid1;
            r2 = mid2 - 1;
            l1 = mid1 + 1;
        }
    }
    console.log(k, rr1, rr2)
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
console.log(findMedianSortedArrays2([1,5], [2, 6]))