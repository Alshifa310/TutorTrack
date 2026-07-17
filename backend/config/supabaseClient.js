const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SECRET_SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.");
}

if (!supabaseKey) {
  throw new Error("SECRET_SUPABASE_KEY is required.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;