const {Router} = require("express");
const { branchController } = require("../controllers/branch.controller");

const router = Router()

router.get("/branch", branchController.getBranches)
router.post("/branch", branchController.postBranch);
router.delete("/branch/:id", branchController.deleteBranch);

module.exports = router