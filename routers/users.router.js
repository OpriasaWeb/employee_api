const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller")

router.post("/register", UsersController.register)
router.get("/hash", UsersController.hash)
router.post("/login", UsersController.login)

module.exports = router