const console = require("console");
const fs = require("fs");

//mongoPart
const { MongoClient } = require("mongodb");
const url = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(url);

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Msg</title><head>");
    res.write(
      `<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const msg = parsedBody.split("=")[1];
      // fs.writeFileSync("msg.txt", msg);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      postData(msg);
      getData();
      res.write("<html>");
      res.write("<head><title>Enter Msg</title><head>");
      res.write(
        `<body>
        <p></p>
        </body>`
      );
      res.write("</html>");
      return res.end();

      // or
      // fs.writeFile("msg.txt", msg, (err) => {
      //   res.statusCode = 302;
      //   res.setHeader("Location", "/");
      //   return res.end();
      // });
    });
  }
  // res.setHeader("Content-Type", "text/html");
  // res.write("<html>");
  // res.write("<head><title>Enter Msg</title><head>");
  // res.write(`<body>Henlo Bro</body>`);
  // res.write("</html>");
  // res.end();
};

async function postData(msg) {
  let result = await client.connect();
  console.log("Connected successfully to server");
  let db = result.db("chats");
  let collection = db.collection("chats1");
  collection.insertOne({ name: `${msg}` }, (err, result) => {});
  console.log("successfully posted data");
}

async function getData() {
  let result = await client.connect();
  console.log("Connected successfully to server");
  let db = result.db("chats");
  let collection = db.collection("chats1");
  let response = await collection.find({}).toArray();
  console.log("successfully got data");
  console.log(response);
  return response;
}

async function getDatas(msg) {
  let result = await client.connect();
  console.log("Connected successfully to server");
  let db = result.db("chats");
  let collection = db.collection("chats1");
  // let response = await collection.find({}).toArray();
  // let name = response.Name;
  collection.insertOne({ name: `${msg}` }, (err, result) => {});
  //   collection.insertMany(
  //     [
  //       { name: "Web Design" },
  //       { name: "Distributed Database" },
  //       { name: "Artificial Intelligence" },
  //     ],
  //     (err, results) => {}
  //   );
  //   collection.updateOne(
  //     { name: "Web Design" },
  //     { $set: { name: "Web Analytics" } },
  //     (err, result) => {
  //       console.log(result);
  //     }
  //   );
  //   collection.deleteOne({ name: "Distributed Database" }, (err, result) => {
  //     console.log(result);
  //   });
  // console.log(response);
}

// module.exports = requestHandler;

exports.handler = requestHandler;
exports.someText = "helllo";

exports.Something = "Hey";
