import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// contexts
import { useJobContext } from 'src/context/job/hooks/usejobContext';
// routes
import { useSnackbar } from 'src/components/snackbar';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
import JobItem from './job-item';

// ----------------------------------------------------------------------

export default function JobList() {
  const { jobs, getJobAction, deleteJobAction } = useJobContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getJobAction();
  }, [getJobAction]);

  const handleView = useCallback(
    (id) => {
      const url = paths.dashboard.students_job.details(id);
      console.log(url);
      router.push(url);
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.dashboard.job.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id) => {
    enqueueSnackbar('Oferta Eliminada', 'success');
    deleteJobAction(id);
    router.push(paths.dashboard.students_job.job);
  },
  [router, deleteJobAction, enqueueSnackbar]
);

return (
  <>
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          onView={() => handleView(job.id)}
          onEdit={() => handleEdit(job.id)}
          onDelete={() => handleDelete(job.id)}
        />
      ))}
    </Box>

    {jobs.length > 8 && (
      <Pagination
        count={8}
        sx={{
          mt: 8,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    )}
  </>
);
}

// JobList.propTypes = {
//   jobs: PropTypes.array,
// };
