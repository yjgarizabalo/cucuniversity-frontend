import { Helmet } from 'react-helmet-async';
// sections
import { UserProfileView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export default function PageProfile() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Inico</title>
      </Helmet>

      <UserProfileView />
    </>
  );
}
