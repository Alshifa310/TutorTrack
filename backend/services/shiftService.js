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

module.exports = { insertShiftlog };