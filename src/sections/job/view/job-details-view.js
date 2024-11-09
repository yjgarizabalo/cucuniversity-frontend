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
import { useAuthContext } from 'src/auth/hooks';
import { useApplyJobsContext } from 'src/context/apply-jobs/hooks/useApplyJobsContext';
import JobDetailsToolbar from '../job-details-toolbar';
import JobDetailsContent from '../job-details-content';
import JobDetailsCandidates from '../job-candidates-list';

// ----------------------------------------------------------------------

export default function JobDetailsView({ id }) {
  const { user } = useAuthContext();
  const { loadingDetail, jobSelected, getJobByIdAction } = useJobContext();
  const { loading, getJobsByUserIdAction } = useApplyJobsContext();

  useEffect(() => {
    getJobByIdAction(id);
    getJobsByUserIdAction(user.id);
  }, [getJobByIdAction, id, getJobsByUserIdAction, user.id]);

  const settings = useSettingsContext();

  return loadingDetail || loading ? (
    <LoadingScreen />
  ) : (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobDetailsToolbar backLink={paths.dashboard.students_job.job} />

      <JobDetailsContent job={jobSelected} />
    </Container>
  );
}

JobDetailsView.propTypes = {
  id: PropTypes.number,
};
