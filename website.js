const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  if (req.url == "/") {
    res.end("<p>Anshuman T</p>");
  } else if (req.url == "/about") {
    res.end("<p>Anshuman T ABout</p>");
  } else if (req.url == "/home") {
    const data = fs.readFileSync("index.html");
    res.end(data.toString());
  } else {
    // res.anshu();
    res.statusCode = 200;
    res.end("<p>NOt found</p>");
  }
});

server.listen(port, () => {
  console.log(`server is lentening on ${port}`);
});
