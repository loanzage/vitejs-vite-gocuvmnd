import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://laezukqmsutahwmjcsyo.supabase.co";

  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZXp1a3Ftc3V0YWh3bWpjc3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDA4MjMsImV4cCI6MjA5MzQ3NjgyM30.-PtVhNhpZ5NUrhpReJJS6P11gCmMB0IJcOlQ3im_ZHM";

    export const supabase = createClient(
      SUPABASE_URL,
        SUPABASE_ANON_KEY
        );