const {Router} = require("express");
const { authController } = require("../controllers/auth.controller");

const router = Router()

router.post("/spreader/registration", authController.signUp)
router.post("/spreader/login", authController.signIn);
router.get("/spreader/users", authController.getUsers);

module.exports = router