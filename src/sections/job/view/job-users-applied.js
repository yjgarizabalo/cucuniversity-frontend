import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { LoadingScreen } from 'src/components/loading-screen';
// contexts
import { useJobContext } from 'src/context/job/hooks/usejobContext';
import { useSettingsContext } from 'src/components/settings';
//
import { useApplyJobsContext } from 'src/context/apply-jobs/hooks/useApplyJobsContext';
import { Typography } from '@mui/material';
import JobUsersAppliedToolbar from '../job-users-applied-toolbar';
import JobCandidatesList from '../job-candidates-list';

// ----------------------------------------------------------------------

export default function JobUsersAppliedView({jobId}) {
  const { jobSelected, loadingDetail, getJobByIdAction } = useJobContext();
  // const { usersByJob, loading, getUsersByJobIdAction } = useApplyJobsContext();

  useEffect(() => {
    getJobByIdAction(jobId)
  }, [ jobId, getJobByIdAction]);

  const settings = useSettingsContext();

  return loadingDetail ? (
    <LoadingScreen />
  ) : (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobUsersAppliedToolbar backLink={paths.dashboard.students_job.job} />
      <Typography variant="h4" sx={{ my: 5 }}>
        {`Usuarios que aplicaron a la oferta ${jobSelected.title}`}
      </Typography>

      <JobCandidatesList jobId={jobId}/>
    </Container>
  );
}

JobUsersAppliedView.propTypes = {
    jobId: PropTypes.number,
  };

  