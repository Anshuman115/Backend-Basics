// core modules important
// http,https,fs,path,os

const http = require("http");
const routes = require("./routes");

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);
