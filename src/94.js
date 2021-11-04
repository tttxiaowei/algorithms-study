/**
https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
94. 二叉树的中序遍历
给定一个二叉树的根节点 root ，返回它的 中序 遍历。

示例 1：
输入：root = [1,null,2,3]
输出：[1,3,2]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]

示例 4：
输入：root = [1,2]
输出：[2,1]

示例 5：
输入：root = [1,null,2]
输出：[1,2]

提示：
树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100

进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * 
 */


function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

function createTree(list) {
    const nodeList = list.map(item => (item == null ? null : new TreeNode(item)))
    let len = nodeList.length
    let lastLevel = [nodeList[0]]
    let currLevel = []
    for (let i = 1; i < len;) {
        let node = lastLevel.shift()
        if (node === null) {
            continue
        } else if (node) {
            currLevel.push(nodeList[i])
            node.left = nodeList[i++] || null
            currLevel.push(nodeList[i])
            node.right = nodeList[i++] || null
        } else {
            lastLevel = currLevel
            currLevel = []
        }
    }
    return nodeList[0]
}
 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    if (!root) {
        return []
    }
    const result = []
    const trace = []
    let midNode, rightNode

    findLeft(root)
    while(trace.length) {
        midNode = trace.pop()
        rightNode = midNode.right
        result.push(midNode)
        if (rightNode) {
            if (!rightNode.left && !rightNode.right) {
                result.push(rightNode)
            } else {
                findLeft(rightNode)
            }
        }
    }
    
    function findLeft(node) {
        while (node.left) {
            trace.push(node)
            node = node.left
        }
        trace.push(node)
    }
    return result.map(item => item.val)
};

console.log(JSON.stringify(inorderTraversal(createTree([1,null,2,3]))))
console.log(JSON.stringify(inorderTraversal(createTree([]))))
console.log(JSON.stringify(inorderTraversal(createTree([1]))))
console.log(JSON.stringify(inorderTraversal(createTree([1, 2]))))
console.log(JSON.stringify(inorderTraversal(createTree([1,null,2]))))