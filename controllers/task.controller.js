const { find, findById } = require("../models/Task.model");
const Task = require("../models/Task.model");

module.exports.taskController = {
  // получить все задачи
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find().populate("branchId");
      res.json(tasks);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // добавить задачу
  postTask: async (req, res) => {
    try {
      const { title, text, userId, branchId, time, points } = req.body;
      const postedTask = await Task.create({
        title,
        text,
        userId,
        branchId,
        points,
        time
      });

      const data = await Task.findById(postedTask._id)
        .populate("userId")
        .populate("branchId");
      res.json(data);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // получить задачу по айди
  getTaskById: async (req, res) => {
    try {
      const taskById = await Task.findById(req.params.id).populate("branchId").populate("userId");
      res.json(taskById);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // получить задачи по отделу

  getTasksByBranch: async (req, res) => {
    try {
        const taskByBranch = await Task.find({branchId: req.params.id}).populate("branchId")
        res.json(taskByBranch)
    } catch (error) {
      res.json({ error: error });
    }
  }
};
