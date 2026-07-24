const { getTutorDashboard } = require("../services/tutorProfileService");
const express = require("express");
const { clerkMiddleware, getAuth } = require("@clerk/express");

const getTutorProfileData = async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.isAuthenticated) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const clerkUserId = auth.userId;

    const data = await getTutorDashboard(clerkUserId);

    res.status(200).json(data);
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
 getTutorProfileData
};