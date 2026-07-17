const express = require("express");
const { clerkMiddleware, getAuth } = require("@clerk/express");
const supabase = require("../config/supabaseClient");
const { insertShiftlog } = require("../services/shiftService");

const router = express.Router();

router.use(clerkMiddleware());

router.post("/", async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.isAuthenticated) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const clerkUserId = auth.userId;
   
    const { log_date, location, sign_in_time, signIn_notes } = req.body;

    if (!log_date || !sign_in_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkUserId)
      .single();

    if (userError || !userRow) {
      return res.status(404).json({
        error: "No user record found for this Clerk account",
      });
    }

    const { data: tutorRow, error: tutorError } = await supabase
      .from("tutors")
      .select("id")
      .eq("user_id", userRow.id)
      .single();

    if (tutorError || !tutorRow) {
      return res.status(404).json({
        error: "No tutor record found for this user",
      });
    }

    const inserted = await insertShiftlog({
      tutor_id: tutorRow.id,
      log_date,
      location: location || null,
      signIn_notes: signIn_notes || null,
      sign_in_time,
    });

    return res.status(201).json({
      message: "Success",
      data: inserted,
    });
  } catch (error) {
    console.error("Supabase Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
