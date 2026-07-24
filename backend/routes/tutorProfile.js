const express = require("express");
const { clerkMiddleware } = require("@clerk/express");
const { getTutorProfileData } = require("../controllers/tutorProfileController");

const router = express.Router();

router.use(clerkMiddleware());

router.get("/", getTutorProfileData);

module.exports = router;