const res = require("express/lib/response");
const http = require("http");
const url = require("url");

const handlers = {};

handlers.newbies = (res) => {
  res.end("hello newbies route");
};

handlers.notFound = () => {
  res.writeHead(404);
  res.end("route does not exit");
};

const router = {
  newbies: handlers.newbies,
};

const server = http.createServer((req, res) => {
  const parsedReq = {};

  parsedReq.parsedUrl = url.parse(req.url, true);
  parsedReq.path = parsedReq.parsedUrl.pathname;
  parsedReq.trimmedPath = parsedReq.path.replace(/\.[^/.]+$/, "");
  parsedReq.method = req.method.toLowerCase();
  parsedReq.headers = req.headers;
  parsedReq.queryStringObject = parsedReq.parsedUrl.query;

  // res.end(`
  //   Path: ${parsedReq.path};
  //   Trimmed Path: ${parsedReq.trimmedPath};'
  //   Method: ${parsedReq.method};
  //   Header: \n${JSON.stringify(parsedReq.headers, null, 2)};
  //   Query: \n${JSON.stringify(parsedReq.queryStringObject, null, 2)};
  // `);

  let body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    body = Buffer.concat(body).toString();
    parsedReq.body = body;
    // res.end(parsedReq.body);

    const routedHandler =
      typeof router[parsedReq.trimmedPath] != "undefined"
        ? router[parsedReq.trimmedPath]
        : handlers.notFound;
    routedHandler(res);
  });
});

server.listen(3000, () => {
  console.log("listening on 3000");
});
