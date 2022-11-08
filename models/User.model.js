const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  login: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  tasks: {
    type: Array,
    default: [],
  },
  branchId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Branch"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
