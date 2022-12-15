console.log("Anshuman");
//write in a file
const fs = require("fs");
fs.writeFileSync("hello.txt", "hellow world");

//creating a node server
// http , https, fs, path, os ==> core modules

const http = require("http");

const routes = require("./routes");

// function rqListener(req,  res) {}
console.log(routes.someText);
console.log(routes.Something);

const server = http.createServer(routes.handler);

server.listen(3000);
