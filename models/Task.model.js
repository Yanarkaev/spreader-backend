const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: String,
    text: String,
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    branchId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Branch",
    },
    points: Number,
    time: Number,
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
