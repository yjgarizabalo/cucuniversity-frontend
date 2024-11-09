// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
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

    students_job: {
      root: `${ROOTS.DASHBOARD}/students_job`,
      job: `${ROOTS.DASHBOARD}/students_job/job`,
      details: (id) => `${ROOTS.DASHBOARD}/students_job/${id}`,
      usersApplied: (id)=> `${ROOTS.DASHBOARD}/students_job/usersApplied/${id}`
    },

    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      roles: `${ROOTS.DASHBOARD}/user/roles`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },

    cv : {
      root: `${ROOTS.DASHBOARD}/cv`,
      cv: `${ROOTS.DASHBOARD}/cv/cv`,
    },
  },
};
