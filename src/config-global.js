// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const CUC_HOST_API = import.meta.env.VITE_CUC_HOST_API_RENDER;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ----------------------------------------------------------------------
// SUPABASE
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;


// ----------------------------------------------------------------------

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
