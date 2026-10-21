const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { updateMe, changePassword } = require("../controllers/userController");

router.patch("/me", verifyToken, updateMe);
router.post("/me/password", verifyToken, changePassword);

module.exports = router;
