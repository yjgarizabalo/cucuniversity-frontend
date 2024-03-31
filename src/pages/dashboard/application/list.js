import { Helmet } from 'react-helmet-async';
// sections
import ApplicationView from 'src/sections/application/view';

// ----------------------------------------------------------------------

export default function PageStudentsJob() {
  return (
    <>
      <Helmet>
        <title> Ofertas de empleo</title>
      </Helmet>

      <ApplicationView />
    </>
  );
}
