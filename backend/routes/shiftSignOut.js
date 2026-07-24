const express = require("express");
const { clerkMiddleware, getAuth } = require("@clerk/express");
const supabase = require("../config/supabaseClient");
const { updateShiftlog, getActiveShift } = require("../services/shiftService");
const router = express.Router();

router.use(clerkMiddleware());

router.patch("/", async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.isAuthenticated) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const clerkUserId = auth.userId;

    const {
      log_date,
      sign_out_time,
      appointment_count,
      location,
      signOut_notes,
    } = req.body;

    if (!log_date || !sign_out_time) {
      return res.status(400).json({
        error: "Missing required fields",
      });
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

    const activeShift = await getActiveShift(tutorRow.id);

    if (!activeShift) {
      return res.status(400).json({
        error: "You are not currently signed in. Please sign in first.",
      });
    }

    const updated = await updateShiftlog({
      shift_id: activeShift.id,
      sign_out_time,
      appointment_count,
      location,
      signOut_notes,
    });

    return res.status(200).json({
      message: "Shift signed out successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Sign Out Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
