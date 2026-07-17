const supabase = require("../config/supabaseClient");

const insertShiftlog = async (shiftData) => {
  const { data, error } = await supabase
    .from("attendancelogs")
    .insert([shiftData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

async function updateShiftlog({
  tutor_id,
  log_date,
  sign_out_time,
  appointment_count,
  location,
  signOut_notes,
}) {
  const { data, error } = await supabase
    .from("attendancelogs")
    .update({
      sign_out_time,
      appointment_count,
      location,
      signOut_notes,
    })
    .eq("tutor_id", tutor_id)
    .eq("log_date", log_date)
    .is("sign_out_time", null)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

module.exports = {
  insertShiftlog,
  updateShiftlog,
};
