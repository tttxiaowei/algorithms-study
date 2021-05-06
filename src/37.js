
/*
力扣序号23. 合并K个升序链表
https://leetcode-cn.com/problems/merge-k-sorted-lists/
给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

示例 2：
输入：lists = []
输出：[]

示例 3：
输入：lists = [[]]
输出：[] 

提示：
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4

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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    lists = lists.filter(item => item)
    let len = lists.length
    if (!len) {
        return null
    }
    let head, lasNode
    while (lists.length) {
        let len = lists.length
        let minNodeIndex = len - 1
        let minNode = lists[minNodeIndex]
        for (let i = minNodeIndex - 1; i > -1; i--) {
            let currNode = lists[i]
            if (currNode.val < minNode.val) {
                minNode = currNode
                minNodeIndex = i
            }
        }
        if (!head) {
            head = lasNode = minNode
        } else {
            lasNode.next = minNode
            lasNode = minNode
        }
        if (!minNode.next) {
            lists.splice(minNodeIndex, 1)
        } else {
            lists[minNodeIndex] = minNode.next
        }
    }
    return head
};

console.log(JSON.stringify(mergeKLists([generateList([])])))