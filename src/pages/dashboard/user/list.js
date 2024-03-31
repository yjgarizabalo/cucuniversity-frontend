import { Helmet } from 'react-helmet-async';
// sections
import { UserListView } from 'src/sections/user/view'

// ----------------------------------------------------------------------

export default function PageUsers() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Usuarios</title>
      </Helmet>

      <UserListView />
    </>
  );
}
