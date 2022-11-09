const Branch = require("../models/Branch.model");

module.exports.branchController = {
  // получить все отделы
  getBranches: async (req, res) => {
    try {
      const branches = await Branch.find();
      res.json(branches);
    } catch (error) {
      res.json(error);
    }
  },

  // добавить отдел
  postBranch: async (req, res) => {
    try {
      const { name } = req.body;
      const postedBranch = await Branch.create({ name });
      res.json(postedBranch);
    } catch (error) {
      res.json(error);
    }
  },
};
