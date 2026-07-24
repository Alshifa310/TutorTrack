const supabase = require("../config/supabaseClient");

const getTutorByClerkId = async (clerkUserId) => {

  const { data: userRow, error: userError } =
    await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerkUserId)
      .single();

  if (userError || !userRow) {
    throw new Error("User not found");
  }

  const { data: tutorRow, error: tutorError } =
    await supabase
      .from("tutors")
      .select("*")
      .eq("user_id", userRow.id)
      .single();

  if (tutorError || !tutorRow) {
    throw new Error("Tutor not found");
  }

  return tutorRow;
};

module.exports = getTutorByClerkId;