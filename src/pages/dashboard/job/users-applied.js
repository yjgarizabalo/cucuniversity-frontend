import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import JobUsersAppliedView from 'src/sections/job/view/job-users-applied';

// ----------------------------------------------------------------------

export default function JobUsersAppliedPage() {

    const params = useParams();

    const { id } = params;
    const jobId = Number(id)

  return (
    <>
      <Helmet>
        <title> Usuarios aplicados a la oferta</title>
      </Helmet>

      <JobUsersAppliedView jobId={jobId}/>
    </>
  );
}
