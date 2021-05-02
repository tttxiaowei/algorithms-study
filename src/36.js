
/*
力扣序号19. 删除链表的倒数第 N 个结点
https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

进阶：你能尝试使用一趟扫描实现吗？

示例 1：
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

示例 2：
输入：head = [1], n = 1
输出：[]

示例 3：
输入：head = [1,2], n = 1
输出：[1]
 
提示：
链表中结点的数目为 sz
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
*/

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function generateList(list) {
    let last = null
    for (let i = list.length - 1; i >= 0; i--) {
        last = new ListNode(list[i], last)
    }
    return last
}

/**
 * 双指针
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
     let tmp = new ListNode(-1, head)
     let left = right = tmp
     while (n) {
         right = right.next
         n--
     }
     while (right.next) {
        right = right.next
        left = left.next
     }
     left.next = left.next.next
     return tmp.next
};

console.log(JSON.stringify(removeNthFromEnd(generateList([1,2,3,4,5]), 3)))