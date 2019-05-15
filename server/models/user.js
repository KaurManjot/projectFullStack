// contains the schema specification for the user table.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema)
