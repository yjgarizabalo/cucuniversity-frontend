// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    perfil: `${ROOTS.DASHBOARD}/perfil`,
    application: `${ROOTS.DASHBOARD}/application`,
    favorite: `${ROOTS.DASHBOARD}/favorite`,
    courses: `${ROOTS.DASHBOARD}/courses`,
    // home: `${ROOTS.DASHBOARD}/home`,

    students_job: {
      root: `${ROOTS.DASHBOARD}/students_job`,
      job: `${ROOTS.DASHBOARD}/students_job/job`,
    },

    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      roles: `${ROOTS.DASHBOARD}/user/roles`,
      account: `${ROOTS.DASHBOARD}/user/account`,
    },
  },
};
