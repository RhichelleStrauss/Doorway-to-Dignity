const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/authRoles");
const { listEvents, mySignups, signUp, createEvent, cancelSignup } = require("../controllers/eventController");

router.get("/", verifyToken, listEvents);
router.get("/mine", verifyToken, mySignups);
router.post("/:id/signup", verifyToken, signUp);
router.post("/", verifyToken, requireRole("admin"), createEvent);
router.delete("/:id/signup", verifyToken, cancelSignup);


module.exports = router;
