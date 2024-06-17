import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Carlos Gomez',
    email: 'cgomez1@cucusa.org',
    password: 'demo1234',
    photoURL: _mock.image.avatar(),
    phoneNumber: '+40 777666555',
    country: 'Colombia',
    address: 'Calle 123 # 45-67',
    state: 'Atlantico',
    city: 'Barranquilla',
    zipCode: '010008',
    about: 'Administrador de empresa.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
