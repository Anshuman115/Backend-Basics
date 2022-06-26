const fs = require("fs");

// fs.readFile("file.txt", "utf8", (err, data) => {
//   console.log(err, data);
// });

// console.log(fs.readFileSync("file.txt").toString());

console.log(fs.writeFileSync("file.txt", "Anshuman"));

console.log("finished reading");
