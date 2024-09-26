'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'countComplementaryPairs' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts STRING_ARRAY stringData as parameter.
 */

function countComplementaryPairs(stringData) {
    let count = 0;

    // Loop through the array and check each pair
    for (let i = 0; i < stringData.length; i++) {
        for (let j = i + 1; j < stringData.length; j++) {
            let str1 = stringData[i];
            let str2 = stringData[j];

            // Check if one string is a prefix or suffix of the other
            if (str1.startsWith(str2) || str1.endsWith(str2) || 
                str2.startsWith(str1) || str2.endsWith(str1)) {
                count++;
            }
        }
    }

    return count;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const stringDataCount = parseInt(readLine().trim(), 10);

    let stringData = [];

    for (let i = 0; i < stringDataCount; i++) {
        const stringDataItem = readLine();
        stringData.push(stringDataItem);
    }

    const result = countComplementaryPairs(stringData);

    ws.write(result + '\n');

    ws.end();
}
