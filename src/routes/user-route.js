const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
const authService = require("../services/auth-service");

router.post("/", controller.create);
router.post("/accounts", controller.addAccounts);
router.post("/login", controller.authenticate);
router.get("/accounts/image/:filename", controller.getImage);
router.get("/:id", authService.authorize, controller.getById);

module.exports = router;