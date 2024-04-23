// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const CUC_HOST_API = import.meta.env.CUC_UNIVERSITY_API;
// export const HOST_API = import.meta.env.VITE_HOST_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ----------------------------------------------------------------------

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
