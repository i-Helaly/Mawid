
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mawid").then(()=> console.log("connected sucessfully")).catch((err)=> console.log(err));

module.exports = mongoose;
