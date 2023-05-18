const Branch = require("../models/Branch.model");
const User = require("../models/User.model");

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

  deleteBranch: async (req, res) => {
    try {
      const workersInBranch = await User.find({ branchId: req.params.id });
      if (workersInBranch.length) {
        const workersCount = workersInBranch.length
        return res.json({
          error: `В этом отделе ${workersCount} работник(а)(ов). Если вы удалите этот отдел, польни пал хир бу, д1авал яг1 хьог!`,
        });
      } else {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        res.json(branch);
      }
    } catch (error) {
      res.json({error: error});
    }
  },
};
