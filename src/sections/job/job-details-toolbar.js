import PropTypes from 'prop-types';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
// routes
import { RouterLink } from 'src/routes/components';
// components
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useApplyJobsContext } from 'src/context/apply-jobs/hooks/useApplyJobsContext';
import { useJobContext } from 'src/context/job/hooks/usejobContext';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function JobDetailsToolbar({ backLink, sx, ...other }) {
  const { jobsByUser, applyJobAction, getJobsByUserIdAction } = useApplyJobsContext();
  const { user } = useAuthContext();
  const { jobSelected } = useJobContext();
  const { permissions } = useAuthContext();
  const [userAlreadyApplied, setUserAlreadyApplied] = useState(false);

  const canApplyJob = permissions.includes('apply_jobOffers');

  useEffect(() => {
    getJobsByUserIdAction(user.id);
  }, [user.id, getJobsByUserIdAction]);

  useEffect(()=>{
    if(jobsByUser.some((job) => job.id === jobSelected.id)){
      setUserAlreadyApplied(true);
    }
  },[jobSelected, jobsByUser])

  const handleApllyJob = async () => {
    const data = {
      userId: user.id,
      jobId: jobSelected.id,
    };
    try {
      await applyJobAction(data);
      setUserAlreadyApplied(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
      {...other}
    >
      <Button
        component={RouterLink}
        href={backLink}
        startIcon={<Iconify icon="eva:arrow-back-fill" width={16} />}
      >
        Atras
      </Button>

      <Box sx={{ flexGrow: 1 }} />
      {canApplyJob && (
        <LoadingButton
          color={userAlreadyApplied ? 'success' : 'inherit'} // Cambia el color a success si ya aplicó
          variant="contained"
          endIcon={
            userAlreadyApplied ? (
              <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} />
            ) : null
          }
          loading={false}
          loadingIndicator="Loading…"
          onClick={() => {
            if (!userAlreadyApplied) {
              handleApllyJob();
            }
          }}
          // disabled={userAlreadyApplied} // Desactiva el botón si ya aplicó
          sx={{ textTransform: 'capitalize' }}
        >
          {userAlreadyApplied ? 'Ya aplicado' : 'Aplicar Oferta'}
        </LoadingButton>
      )}
    </Stack>
  );
}

JobDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  sx: PropTypes.object,
};


