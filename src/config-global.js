// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const CUC_HOST_API = import.meta.env.VITE_CUC_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ----------------------------------------------------------------------
// SUPABASE
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_AVATAR_URL = import.meta.env.VITE_SUPABASE_ASSETS_AVATAR_URL;

// ----------------------------------------------------------------------

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
