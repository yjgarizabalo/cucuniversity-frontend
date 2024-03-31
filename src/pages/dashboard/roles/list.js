import { Helmet } from 'react-helmet-async';
// sections
import { RoleListView } from 'src/sections/roles/view';

// ----------------------------------------------------------------------

export default function PageRoles() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Roles</title>
      </Helmet>

      <RoleListView />
    </>
  );
}
