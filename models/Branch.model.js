const mongoose = require("mongoose");

const branchSchema = mongoose.Schema({
  name: String,
});

const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
