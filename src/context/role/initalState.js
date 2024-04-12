export const initialState = {
  roles: [
    {
      id: 1,
      name: 'Administrador',
      description: 'Administrador',
    },
    {
      id: 2,
      name: 'Estudiante',
      description: 'Estudiante',
    },
    {
      id: 3,
      name: 'Profesor',
      description: 'Profesor',
    },
    {
      id: 4,
      name: 'Empleador',
      description: 'Empleador',
    },
    {
      id: 5,
      name: 'Coordinador',
      description: 'Coordinator',
    }
  ],
  roleSelected: {},
  loading: false,
  error: false,
}