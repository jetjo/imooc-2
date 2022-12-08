/**
 * @description 此方法不允许有重复的值！否则抛出异常，使用前可以先检查
 * @param {string[]} sortedStringList 
 * @param {string} aString 
 * @returns {number} aString's index
 */
export function insertSortedStringArray(sortedStringList, aString)
{
    // debugger;
    if (!Array.isArray(sortedStringList)) throw new Error('第一个数组参数必须是数组！')
    if (typeof aString !== 'string') throw new Error('第二个字符串参数必须是字符串！')
    let i = 0;
    if (sortedStringList.length == 0) { i = 0; }
    else if (sortedStringList.length == 1) { i = isGreaterLeftString(aString, sortedStringList[0]) ? 1 : 0; }
    else { i = _getSortedIndex(0, sortedStringList, aString); }
    if (sortedStringList[i] === aString || sortedStringList[i + 1] === aString)
    {
        throw new Error('此方法不允许数组有重复的值！')
    }
    sortedStringList.splice(i, 0, aString);
    return i;
}

/**
 * 
 * @param {string[]} sortedStringList 
 * @param {string} aString 
 * @returns {number} aString's index
 */
export function getIndexAtSortedStringArray(sortedStringList, aString)
{
    // debugger;
    if (!Array.isArray(sortedStringList)) throw new Error('第一个数组参数必须是数组！')
    if (typeof aString !== 'string') throw new Error('第二个字符串参数必须是字符串！')
    let i = -1;
    if (sortedStringList.length == 0) { i = -1; }
    else if (sortedStringList.length == 1) { i = aString === sortedStringList[0] ? 0 : -1; }
    else { i = _getSortedIndexEq(0, sortedStringList, aString); }
    return i;
}

function isGreaterLeftString(a, b)
{
    if (typeof a !== 'string' || typeof b !== 'string') throw new Error('参数必须是字符串！');
    for (let i = 0; i < a.length; i++)
    {
        if (!b[i]) return true;
        if (a[i] === b[i]) continue;
        return a[i] > b[i];
    }
    return a.length > b.length;
}

function _getSortedIndex(offset, sortedStringList, aString)
{
    if (sortedStringList.length == 1) return isGreaterLeftString(aString, sortedStringList[0]) ? offset + 1 : offset;
    const leftLen = Math.ceil(sortedStringList.length / 2);
    if (!isGreaterLeftString(aString, sortedStringList[leftLen - 1]))
    {
        sortedStringList = sortedStringList.slice(0, leftLen);
        return _getSortedIndex(offset, sortedStringList, aString);
    }
    else if (isGreaterLeftString(aString, sortedStringList[leftLen]))
    {
        return _getSortedIndex(offset + leftLen, sortedStringList.slice(leftLen), aString);
    }
    else
    {
        return offset + leftLen;
    }
}

function _getSortedIndexEq(offset, sortedStringList, aString)
{
    if (sortedStringList.length == 1) return aString === sortedStringList[0] ? offset : -1;
    const leftLen = Math.ceil(sortedStringList.length / 2);
    if (aString === sortedStringList[leftLen - 1])
    {
        return offset + leftLen - 1;
    }
    else if (aString === sortedStringList[leftLen])
    {
        return offset + leftLen;
    }
    else if (!isGreaterLeftString(aString, sortedStringList[leftLen - 1]))
    {
        sortedStringList = sortedStringList.slice(0, leftLen);
        return _getSortedIndexEq(offset, sortedStringList, aString);
    }
    else if (isGreaterLeftString(aString, sortedStringList[leftLen]))
    {
        return _getSortedIndexEq(offset + leftLen, sortedStringList.slice(leftLen), aString);
    }
    else
    {
        return -1;
    }
}
