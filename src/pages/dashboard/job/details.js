import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { JobDetailsView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function JobDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Ofertas</title>
      </Helmet>

      <JobDetailsView id={Number(id)} />
    </>
  );
}
