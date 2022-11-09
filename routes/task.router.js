const { Router } = require("express");
const { taskController } = require("../controllers/task.controller");
const router = Router();

router.post("/spreader/tasks", taskController.postTask);
router.get("/spreader/tasks", taskController.getTasks);
router.get("/spreader/tasks/:id", taskController.getTaskById);
router.patch("/spreader/tasks/:id", taskController.message);
router.patch("/spreader/tasks/take/:id", taskController.work);
router.patch("/spreader/tasks/close/:id", taskController.close);
router.get("/spreader/tasks/branch/:id", taskController.getTasksByBranch);

module.exports = router;
