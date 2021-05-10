/**
 力扣序号49. 字母异位词分组
 https://leetcode-cn.com/problems/permutations/
给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

示例:
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]

说明：
所有输入均为小写字母。
不考虑答案输出的顺序。
**/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let ans = []
    let ansMap = []
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i]
        let mapIndex = -1
        let strArr = [...str]
        ansMap.some((item, index) => {
            if (str.length === item.length) {
                let strMap = {};
                if (!strArr.some(v => {
                    if (!item[v]) {
                        return true
                    }
                    if (strMap[v]) {
                        strMap[v] += 1
                    } else {
                        strMap[v] = 1
                    }
                    if (strMap[v] > item[v]) {
                        return true
                    }
                })) {
                    mapIndex = index
                    return true
                }
            }
        })
        if (mapIndex > -1) {
            ans[mapIndex].push(str)
        } else {
            ans.push([str])
            let strMap = {};
            strArr.forEach(item => {
                if (strMap[item]) {
                    strMap[item] += 1
                } else {
                    strMap[item] = 1
                }
            })
            ansMap.push({
                ...strMap,
                length: str.length
            })
        }
    }
    return ans
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams1 = function(strs) {
    let ans = []
    let ansMap = {}
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i]
        let sortStr = [...str].sort().join('')
        let index = ansMap[sortStr]
        if (index != null) {
            ans[index].push(str)
        } else {
            ansMap[sortStr] = ans.length
            ans.push([str])
        }
    }
    return ans
};
console.log(JSON.stringify(groupAnagrams1(["eat", "tea", "tan", "ate", "nat", "bat"])))
