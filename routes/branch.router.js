const {Router} = require("express");
const { branchController } = require("../controllers/branch.controller");

const router = Router()

router.get("/spreader/branch", branchController.getBranches)
router.post("/spreader/branch", branchController.postBranch);

module.exports = router