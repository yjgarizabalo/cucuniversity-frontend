import { Helmet } from 'react-helmet-async';
// sections
import { AccountView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Configuración de cuenta</title>
      </Helmet>

      <AccountView />
    </>
  );
}
