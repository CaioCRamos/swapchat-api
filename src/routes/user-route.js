const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");

router.post("/", controller.create);
router.post("/accounts", controller.addAccounts);
router.post("/login", controller.authenticate);
router.get("/accounts/image/:filename", controller.getImage);

module.exports = router;