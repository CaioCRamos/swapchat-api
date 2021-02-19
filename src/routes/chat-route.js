const express = require("express");
const router = express.Router();
const controller = require("../controllers/chat-controller");
const authService = require("../services/auth-service");

router.post("/", authService.authorize, controller.create);
router.get("/:userAccountId", authService.authorize, controller.getAll);

module.exports = router;