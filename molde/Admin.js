const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    email: String,
    passWord: String,
    name: String,
    image:String,

  });

module.exports = mongoose.model("Admin",Admin);