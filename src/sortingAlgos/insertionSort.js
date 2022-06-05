export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    const auxiliaryArray = array.slice();
    insertionSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function insertionSortHelper(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    if (startIdx === endIdx) {
        return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations); // left half
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations); // right half
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}


// insert 
