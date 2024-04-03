import { Helmet } from 'react-helmet-async';
// sections
import { JobListView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function JobListPage() {
  return (
    <>
      <Helmet>
        <title>Ofertas de empleo</title>
      </Helmet>

      <JobListView />
    </>
  );
}
