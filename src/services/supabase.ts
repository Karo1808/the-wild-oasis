import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yijubryaceakndfmbred.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpanVicnlhY2Vha25kZm1icmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODEzODQsImV4cCI6MjAwMjc1NzM4NH0.6xIXwgeGl_5btkfHzvgGH3y7F3Rn8UCtQIGQtAQlgwc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
