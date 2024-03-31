import { Helmet } from 'react-helmet-async';
// sections
import FavoriteView from 'src/sections/favorite/view';

// ----------------------------------------------------------------------

export default function PageStudentsJob() {
  return (
    <>
      <Helmet>
        <title> Ofertas de empleo</title>
      </Helmet>

      <FavoriteView />
    </>
  );
}
