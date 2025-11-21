import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const service_role_key = process.env.SUPABASE_SERVICE_ROLE as string;

const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
export const adminAuthClient = supabase.auth.admin;
