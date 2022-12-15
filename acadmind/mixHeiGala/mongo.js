const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/");

mongoose.connection
  .once("open", () => {
    console.log("Sucessss");
  })
  .on("error", function (error) {
    console.log(error);
  });
