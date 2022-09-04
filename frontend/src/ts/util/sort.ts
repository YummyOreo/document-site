function merge(arr1: any[], arr2: any[], getVal: Function): any {
  let res = [],
    i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (getVal(arr1, i) < getVal(arr2, j)) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }

  // Add the rest of the remining subarray, to our new array
  while (i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    res.push(arr2[j]);
    j++;
  }
  return res;
}

export function mergeSort(arr: any[], getVal: Function): any {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid), getVal);
  let right = mergeSort(arr.slice(mid), getVal);

  return merge(left, right, getVal);
}

export function getValDocuments(array: any[], i: number): any {
  return array[i]["title"].replace(" ", "").toLowerCase();
}
