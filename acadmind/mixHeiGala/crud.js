const { MongoClient } = require("mongodb");
const url = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(url);

async function getData() {
  let result = await client.connect();
  console.log("Connected successfully to server");
  let db = result.db("chats");
  let collection = db.collection("chats1");
  let response = await collection.find({}).toArray();
  let name = response.Name;
  //   collection.insertOne({ name: "Web Security" }, (err, result) => {});
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
  console.log(response);
}

getData();
