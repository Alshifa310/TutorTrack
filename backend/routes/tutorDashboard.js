const express = require("express");
const { clerkMiddleware } = require("@clerk/express");

const { getDashboard } = require("../controllers/tutordashboardController");

const router = express.Router();

router.use(clerkMiddleware());

router.get("/", getDashboard);

module.exports = router;
