const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>helllo</title>
    </head>
    <body>
    <form action="/message" method="POST">
      <input type="text" name="message" /><button type="submit">send</button>
    </form>
    </body>
    </html>
    `);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //   fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>helllo</title>
    </head>
    <body>
    <div>hello</div>
    </body>
    </html>
    `);
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "Here is some text",
// };

// module.exports.handler = requestHandler;
// module.exports.someText = "Here is some text";

exports.handler = requestHandler;
exports.someText = "Here is some text";
