// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify';
import { useApplyJobsContext } from 'src/context/apply-jobs/hooks/useApplyJobsContext';
import { LoadingScreen } from 'src/components/loading-screen';
import { useBoolean } from 'src/hooks/use-boolean';
import EmptyContent from 'src/components/empty-content';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import JobViewCandidateDetail from './job-view-candidate-detail';
import JobCandidateItem from './job-candidate-item';

// ----------------------------------------------------------------------

export default function JobCandidatesList({ jobId }) {
  const { usersByJob, loading, getUsersByJobIdAction } = useApplyJobsContext();

  useEffect(() => {
    getUsersByJobIdAction(jobId);
  }, [getUsersByJobIdAction, jobId]);


  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {usersByJob.map((user) => (
          <JobCandidateItem key={user.id} user={user} />
        ))}
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <EmptyContent
          title="No hay candidatos"
          noFound={!usersByJob.length}
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexGrow: 1,
          }}
        />
      </Box>
    </>
  );
}

JobCandidatesList.propTypes = {
  jobId: PropTypes.number,
};
