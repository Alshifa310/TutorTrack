const supabase = require("../config/supabaseClient");
const getTutorByClerkId = require("./getTutorByClerkId");

const getTutorDashboard = async (clerkUserId) => {

  const tutor = await getTutorByClerkId(clerkUserId);

  const { data: schedules } = await supabase
    .from("schedules")
    .select("*")
    .eq("tutor_id", tutor.id);

  const { data: attendanceLogs } = await supabase
    .from("attendancelogs")
    .select("*")
    .eq("tutor_id", tutor.id)
    .order("log_date", { ascending: false })
    .order("sign_in_time", { ascending: false });

  const { data: timeOffRequests } = await supabase
    .from("timeoffrequests")
    .select("*")
    .eq("tutor_id", tutor.id)
    .order("start_date", { ascending: false });

  return {
    success: true,
    tutor,
    schedules,
    attendanceLogs,
    timeOffRequests
  };
};

module.exports = {
  getTutorDashboard
};