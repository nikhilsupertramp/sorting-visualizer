export function getMergeSortAnimations(array) {
  if (array.length <= 1) return array;
  const animations = [];  
  const auxiliaryArray = array.slice();
  const tempArray = array.slice()
  mergeSortHelper(tempArray, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  const transitions = [];
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      transitions.push([i, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      transitions.push([j, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  };
  while (i <= middleIdx) {
    transitions.push([i, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  };
  while (j <= endIdx) {
    transitions.push([j, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  };
  const currentAnimation = {
    leftPart: [startIdx, middleIdx],
    rightPart: [middleIdx + 1, endIdx],
    transitions: transitions,
    currentArray: mainArray.slice()
  };
  animations.push(currentAnimation);
}
