/**
力扣序号21
https://leetcode-cn.com/problems/merge-two-sorted-lists/

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例 1：
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

示例 2：
输入：l1 = [], l2 = []
输出：[]

示例 3：
输入：l1 = [], l2 = [0]
输出：[0]

 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 迭代做法
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists1 = function(l1, l2) {
    if (!l1) {
        return l2;
    }
    if (!l2) {
        return l1;
    }
    let result, last;
    if (l1.val < l2.val) {
        result = last = l1;
        l1 = l1.next;
    } else {
        result = last = l2;
        l2 = l2.next;
    }
    while(l1 && l2) {
        if (l1.val < l2.val) {
            last.next = l1;
            last = l1;
            l1 = l1.next;
        } else {
            last.next = l2;
            last = l2;
            l2 = l2.next;
        }
    }
    if (l1) {
        last.next = l1;
    }
    if (l2) {
        last.next = l2;
    }
    return result;
};


/**
 * 递归做法
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists2 = function(l1, l2) {
    if (!l1) {
        return l2;
    } else if (!l2) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists2(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists2(l1, l2.next);
        return l2;
    }
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

let l11 = new ListNode(19);
let l12 = new ListNode(9, l11);
let l13 = new ListNode(7, l12);
let l14 = new ListNode(6, l13);
let l15 = new ListNode(3, l14);
let l16 = new ListNode(1, l15);

let l21 = new ListNode(21);
let l22 = new ListNode(12, l21);
let l23 = new ListNode(10, l22);
let l24 = new ListNode(8, l23);
let l25 = new ListNode(5, l24);
let l26 = new ListNode(2, l25);

let l3 = mergeTwoLists2(l16, l26);
while(l3) {
    console.log(l3.val);
    l3 = l3.next;
}
