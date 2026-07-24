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
  shift_id,
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
    .eq("id", shift_id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
const getActiveShift = async (tutorId) => {
  const { data, error } = await supabase
    .from("attendancelogs")
    .select("*")
    .eq("tutor_id", tutorId)
    .is("sign_out_time", null)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
module.exports = {
  insertShiftlog,
  updateShiftlog,
  getActiveShift,
};
