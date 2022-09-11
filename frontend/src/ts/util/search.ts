import { store } from "../store";
import { mergeSort } from "./sort";

export function searchDocs(query: string) {
  const queryWords = query.toLowerCase().split(" ");

  let weights: { [name: string]: number } = {};

  for (var i in store["documents"]) {
    const doc = store["documents"][i];

    let goodWords: any[] = [];
    const titleWords = doc["title"].toLowerCase().split(" ");

    for (var y in titleWords) {
      for (var x = 0; x < queryWords.length; x++) {
        if (titleWords[y].search(queryWords[x]) != -1) {
          goodWords.push(titleWords[y]);
        }
      }
    }

    let wordWeight = 0;

    for (var b in goodWords) {
      wordWeight += goodWords[b].length;
    }

    weights[i] = wordWeight;
  }
  return mergeSort(
    match(weights),
    (array: any[], i: number) => array[i]["weight"]
  );
}

function match(vals: { [name: string]: number }): any[] {
  let matchedVals: any[] = [];

  for (var i in vals) {
    let newVal = store["documents"][i];
    newVal["weight"] = vals[i];
    matchedVals.push(newVal);
  }
  return matchedVals;
}
