import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// components
import Iconify from 'src/components/iconify';
import { useApplyJobsContext } from 'src/context/apply-jobs/hooks/useApplyJobsContext';
import { LoadingScreen } from 'src/components/loading-screen';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import EmptyContent from 'src/components/empty-content';

export default function ProfileAplications() {
  const { user } = useAuthContext();
  const { jobsByUser, loading, getJobsByUserIdAction } = useApplyJobsContext();

  const router = useRouter();

  useEffect(() => {
    getJobsByUserIdAction(user.id);
  }, [getJobsByUserIdAction, user.id]);

  const handleView = useCallback(
    (id) => {
      const url = paths.dashboard.students_job.details(id);
      router.push(url);
    },
    [router]
  );

  return loading ? (
    <LoadingScreen />
  ) : (
    <Box>
      <Typography variant="h4" sx={{ my: 5 }}>
        Aplicaciones 💼
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
        {jobsByUser.map((job) => (
          <JobItem key={job.id} job={job} onView={handleView} />
        ))}
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <EmptyContent
          title="No hay aplicaciones"
          noFound={jobsByUser.length === 0}
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
    </Box>
  );
}

// ----------------------------------------------------------------------

function JobItem({ job, onView }) {
  const { title, company, location } = job;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: (theme) => theme.spacing(3, 2, 3, 3),
      }}
    >
      <Avatar alt={title} src={title} sx={{ width: 48, height: 48, mr: 2 }} />

      <ListItemText
        primary={title}
        secondary={
          <>
            <Box display="flex" alignItems="center">
              <Iconify icon="mdi:office-building" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
              {company}
            </Box>
            <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
              <Iconify icon="mingcute:location-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
              {location}
            </Box>
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          display: 'flex',
          flexDirection: 'column',
          component: 'span',
          alignItems: 'flex-start',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      <Button
        size="small"
        onClick={() => {
          onView(job.id);
        }}
        sx={{ flexShrink: 0, ml: 1.5 }}
      >
        Ver detalle
      </Button>
    </Card>
  );
}

JobItem.propTypes = {
  job: PropTypes.object,
  onView: PropTypes.func,
};
