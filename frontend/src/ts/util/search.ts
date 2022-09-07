export function searchDocs() {
  const testTitle = "This is a a test title";
  const testQuery = "This is a test";

  const testTitleWords = testTitle.toLowerCase().split(" ");
  const testQueryWords = testQuery.toLowerCase().split(" ");

  let goodWords: any[] = [];

  for (var i = 0; i < testQueryWords.length; i++) {
    console.log(testTitleWords.includes(testQueryWords[i]));

    if (testTitleWords.includes(testQueryWords[i])) {
      goodWords.push(testQueryWords[i]);
    }
  }
  console.log(goodWords);
}
