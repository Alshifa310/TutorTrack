const { getAuth } = require("@clerk/express");
const { getDashboardData } = require("../services/tutordashboardService");

const getDashboard = async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.isAuthenticated) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const dashboardData = await getDashboardData(
      auth.userId
    );

    return res.status(200).json(dashboardData);

  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};