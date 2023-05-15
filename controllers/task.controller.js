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

  getNewTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ state: "new" }).populate("branchId");
      res.json(tasks);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // добавить задачу
  postTask: async (req, res) => {
    try {
      const { title, text, userId, branchId, time, points, state } = req.body;
      const postedTask = await Task.create({
        title,
        text,
        userId,
        branchId,
        points,
        time,
        state,
      });

      const data = await Task.findById(postedTask._id)
        .populate("userId")
        .populate("branchId");
      res.json(data);
    } catch (error) {
      res.json({ error: error });
    }
  },

  handleTime: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, {
        time: req.body.time,
      });
      res.json(task);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // Добавить заметку в задачу
  message: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, {
        notes: req.body.notes,
      });
      res.json(task);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // Взять задачу в работу
  work: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          state: "inWork",
          userId: req.body.userId,
          branchId: req.body.branchId,
        },
        { new: true }
      );
      res.json(task);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // Закрыть задачу
  close: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { state: "closed" },
        { new: true }
      );
      res.json(task);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // получить задачу по айди
  getTaskById: async (req, res) => {
    try {
      const taskById = await Task.findById(req.params.id)
        .populate("branchId")
        .populate("userId");

      res.json(taskById);
    } catch (error) {
      res.json({ error: error });
    }
  },

  // получить задачи по отделу
  getTasksByBranch: async (req, res) => {
    try {
      const taskByBranch = await Task.find({
        branchId: req.params.id,
      }).populate("branchId");
      res.json(taskByBranch);
    } catch (error) {
      res.json({ error: error });
    }
  },

  getTasksByUser: async (req, res) => {
    try {
      const tasksByUser = await Task.find({ userId: req.params.userId });

      res.json(tasksByUser);
    } catch (error) {
      res.json({ error: error });
    }
  },
};
