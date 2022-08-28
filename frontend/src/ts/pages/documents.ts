import { getDocs } from "../api/endpoints/doc";
import { store } from "../store";
import { PageDefault } from "../types/classes";

import * as Snackbar from "../../js/snackbar.min.js";

export const urls = ["/documents*"];

export class Page extends PageDefault {
  name: string;
  url: string[];
  html: string;
  css: string[];
  discordAuth: boolean;
  documents: any;
  docPrevs: HTMLElement[];
  constructor() {
    super();
    this.name = "Documents";
    this.url = urls;
    this.html = "documents.html";
    this.css = ["docs.css"];
    this.docPrevs = [];
  }

  async run() {
    super.run();

    $(".sort button").on("click", (e) => {
      switch (e.target.textContent) {
        case "A - Z":
          store["documents"] = this.mergeSort(store["documents"]);
          break;
        case "Z - A":
          store["documents"] = this.mergeSort(store["documents"]).reverse();
          break;
        case "Recent":
          store["documents"] = this.documents["documents"];
          break;
        default:
          store["documents"] = this.documents["documents"];
      }

      this.docPrevs.forEach((elm: any, index: number) => {
        elm.setAttribute("compId", store["documents"][index]["_id"]);
        elm.setAttribute("index", index.toString());
        elm.connectedCallback();
      });

      $(".clicked").removeClass("clicked");

      e.target.classList.add("clicked");
    });

    this.documents = await getDocs();

    store["documents"] = this.documents["documents"].reverse();

    store["documents"].forEach((val: any, index: any) => {
      const elm: any = document.createElement("custom-component");

      elm.setAttribute("name", "documentPrev");
      elm.setAttribute("compId", val["_id"]);
      elm.setAttribute("index", index.toString());

      this.docPrevs.push(elm);

      $(".documents").append(elm);
    });
  }

  merge(arr1: any[], arr2: any[]): any {
    // Make a new array, and 2 pointers to keep track of elements of arr1 and arr2
    let res = [],
      i = 0,
      j = 0;

    // Loop until either arr1 or arr2 becomes empty
    while (i < arr1.length && j < arr2.length) {
      // If the current element of arr1 is lesser than that of arr2, push arr1[i] and increment i
      if (
        arr1[i]["title"].replace(" ", "").toLowerCase() <
        arr2[j]["title"].replace(" ", "").toLowerCase()
      ) {
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

  mergeSort(arr: any[]): any {
    // Base case
    if (arr.length <= 1) return arr;

    // Splitting into two halves
    let mid = Math.floor(arr.length / 2);
    let left = this.mergeSort(arr.slice(0, mid));
    let right = this.mergeSort(arr.slice(mid));

    // merging the two sorted halves
    return this.merge(left, right);
  }
}
