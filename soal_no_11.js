"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Define and complete the 'createPaginator' function below.
 *
 * The function should accept the following parameters:
 *  1. INTEGER_ARRAY items
 *  2. INTEGER pageSize
 */
function* createPaginator(items, pageSize) {
  let index = 0;
  while (index < items.length) {
    yield items.slice(index, index + pageSize);
    index += pageSize;
  }
}
function main() {
  const fs = require("fs");
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const itemsCount = parseInt(readLine().trim(), 10);

  let items = [];

  for (let i = 0; i < itemsCount; i++) {
    const itemsItem = parseInt(readLine().trim(), 10);
    items.push(itemsItem);
  }

  const pageSize = parseInt(readLine().trim(), 10);

  const gen = createPaginator(items, pageSize);
  let page = gen.next().value;
  while (page) {
    ws.write(page.join(" ") + "\n");
    page = gen.next().value;
  }
  ws.end();
}
