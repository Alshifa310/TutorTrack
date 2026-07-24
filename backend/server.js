const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
const fs = require("fs");

const shiftSignInRoute = require("./routes/shiftSignIn");
const shiftSignOutRoute = require("./routes/shiftSignOut");
const tutorProfileRoutes = require("./routes/tutorProfile");
const tutordashboardRoutes = require("./routes/tutorDashboard");


const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3001" }));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! Your Express server is working.");
});


app.use("/api/shift/sign-in", shiftSignInRoute);
app.use("/api/shift/sign-out", shiftSignOutRoute);
app.use("/api/tutor/profile", tutorProfileRoutes);
app.use("/api/tutor/dashboard", tutordashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
