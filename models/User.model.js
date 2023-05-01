const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  login: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  branchId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Branch",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
