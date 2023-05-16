const { Router } = require("express");
const { authController } = require("../controllers/auth.controller");

const router = Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/users", authController.getUsers);
router.get("/users/:userId", authController.getUser);

module.exports = router;
