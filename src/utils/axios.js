import axios from 'axios';
// config
import { CUC_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CUC_HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Error en el servidor, intente mas tarde'
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

// METHODS HTTP

/* get */
export const getFetch = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

/* patch */
export const updateFetch = async (url, data, config) => {
  if (config === null) {
    config = {};
  }
  const res = await axiosInstance.patch(url, data, { ...config });
  return res.data;
};

/* post */
export const postFetch = async (url, data, config) => {
  if (config === null) {
    config = {};
  }
  const res = await axiosInstance.post(url, data, { ...config });
  return res.data;
};

/* delete */
export const deleteFetch = async (url, config) => {
  if (config === null) {
    config = {};
  }
  const res = await axiosInstance.delete(url, { ...config });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  users: '/api/v1/users',
  roles: '/api/v1/roles',
  jobs: '/api/v1/jobs',
  cv: '/api/v1/cv',
  applyJobs: {
    apply: '/api/v1/applications',
    jobsByUser: '/api/v1/applications/jobs-by-users/',
    usersByJob: '/api/v1/applications//users-by-jobs/',
  },
  auth: {
    login: '/api/v1/auth/login',
    auth: '/api/v1/auth/auth',
    me: '/api/v1/auth/me',
    logout: '/api/v1/auth/logout'
  },
};
