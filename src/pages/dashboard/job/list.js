import { Helmet } from 'react-helmet-async';
// sections
import JobView from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function PageStudentsJob() {
  return (
    <>
      <Helmet>
        <title> Ofertas de empleo</title>
      </Helmet>

      <JobView />
    </>
  );
}
