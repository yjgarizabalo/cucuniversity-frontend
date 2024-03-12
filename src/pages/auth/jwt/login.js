import { Helmet } from 'react-helmet-async';
// sections
import { ModernLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>

      <ModernLoginView />
    </>
  );
}
