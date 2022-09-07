export function searchDocs() {
  const testTitle = "This is a a test title";
  const testQuery = "This is a test";

  const testTitleWords = testTitle.split(" ");
  const testQueryWords = testQuery.split(" ");

  let goodWords: any[] = [];

  for (var i = 0; i < testTitleWords.length; i++) {
    for (var b = 0; b < testQueryWords.length; b++) {
      if (testTitleWords[i] == testQueryWords[b]) {
        goodWords.push(testTitleWords[i]);
      }
    }
  }

  console.log(goodWords);
}
