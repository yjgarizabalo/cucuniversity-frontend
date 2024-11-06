const permissions = {
  estudiante: [
    'read_employment_profile',
    'write_employment_profile',
    'read_jobApplications',
    'write_jobApplications',
    'read_jobOffers',
    'apply_jobOffers',
  ],
  funcionario: [
    'read_jobOffers',
    'create_jobOffers',
    'update_jobOffers',
    'delete_jobOffers',
    'read_admModule',
    'read_users',
    'delete_users',
  ],
  'super administrador': [
    'read_jobOffers',
    'create_jobOffers',
    'update_jobOffers',
    'delete_jobOffers',
    'read_admModule',
    'read_users',
    'delete_users',
    'create_users',
    'update_users',
    'read_roles',
    'create_roles',
    'update_roles',
    'delete_roles',
  ],
};

function getUserPermissions(user) {
    const normalizedRoleName = user.role.name.toLowerCase();
    const userPermissions = permissions[normalizedRoleName] || [];
    return userPermissions;
  }

  export default getUserPermissions;

// perfil empleado = read_employment_profile, write_employment_profile
// aplicaciones = read_jobApplications, write_jobApplications
// ofertas= read_jobOffers, create_jobOffers, update_jobOffers, delete_jobOffers, apply_jobOffers
// administrador = read_admModule, read_users, create_users, update_users, delete_users, read_roles,
// create_roles, update_roles, delete_roles
