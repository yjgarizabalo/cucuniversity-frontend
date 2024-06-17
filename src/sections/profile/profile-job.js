import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

// contexts
import { useJobContext } from 'src/context/job/hooks/usejobContext';

// components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Iconify from 'src/components/iconify';

// utils
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';


export default function ProfileJob() {
  const { jobs, getJobAction, } = useJobContext();

  useEffect(() => {
    getJobAction();
  }, [getJobAction]);

  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Mis ofertas de empleo
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
        }}
      >
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </Box>
    </>
  );
};

ProfileJob.propTypes = {
  // jobs: PropTypes.array,
};

// ----------------------------------------------------------------------

function JobItem({ job }) {
  const { title, location, salary, experience, avatarUrl } = job;

  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      const url = paths.dashboard.students_job.details(id);
      router.push(url);
    },
    [router]
  );

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
      }}
    >
      <Avatar alt={title} src={avatarUrl} sx={{ width: 48, height: 48, mr: 2 }} />

      <ListItemText
        primary={title}
        secondary={
          <ul style={{ paddingLeft: '1em', listStyleType: 'none' }}>
            <li><Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />{location}</li>
            <li><Iconify icon="solar:wad-of-money-bold" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />{salary}</li>
            <li><Iconify icon="carbon:skill-level-basic" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />{experience}</li>
          </ul>
        }
      />



      <Button
        size="small"
        startIcon={
          <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} />
        }
        onClick={handleView}
        sx={{ flexShrink: 0, ml: 1.5 }}
      >
        ver
      </Button>
    </Card>
  );
}

JobItem.propTypes = {
  job: PropTypes.object,
};

