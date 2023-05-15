const { Router } = require("express");
const { taskController } = require("../controllers/task.controller");
const router = Router();

router.post("/tasks", taskController.postTask);
router.get("/tasks", taskController.getTasks);
router.get("/tasks/new", taskController.getNewTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.get("/tasks/user/:userId", taskController.getTasksByUser);
router.patch("/tasks/:id", taskController.message);
router.patch("/tasks/time/:id", taskController.handleTime);
router.patch("/tasks/take/:id", taskController.work);
router.patch("/tasks/close/:id", taskController.close);
router.get("/tasks/branch/:id", taskController.getTasksByBranch);

module.exports = router;
