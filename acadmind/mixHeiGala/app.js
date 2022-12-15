const { MongoClient } = require("mongodb");
const url = "mongodb://0.0.0.0:27017/";
const databaseName = "chats";
const client = new MongoClient(url);

async function getData() {
  let result = await client.connect();
  console.log("Connected successfully to server");
  db = result.db(databaseName);
  collection = db.collection("chats1");
  let data = await collection.find({}).toArray();
  console.log(data);
}

getData();
