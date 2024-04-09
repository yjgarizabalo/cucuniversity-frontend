import { Helmet } from 'react-helmet-async';
// sections
import { _userFavorites } from 'src/_mock';
import ProfileFavorite from 'src/sections/profile/profile-favorite';


// ----------------------------------------------------------------------

export default function PageStudentsJob() {
  return (
    <>
      <Helmet>
        <title> Ofertas de empleo</title>
      </Helmet>

      <ProfileFavorite favorites={_userFavorites} />
    </>
  );
}
