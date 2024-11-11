import PropTypes from 'prop-types';
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
import JobViewCandidateDetail from './job-view-candidate-detail';

// ----------------------------------------------------------------------

export default function JobCandidatesList() {
  const { usersByJob, loading } = useApplyJobsContext();

  const ViewUserDetail = useBoolean();

  return loading ? (
    <LoadingScreen />
  ) : (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {usersByJob.map((user) => (
        <Stack component={Card} direction="row" spacing={2} key={user.id} sx={{ p: 3 }}>
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

          <Avatar alt={user.firstName} src={user.cv.avatar || user.firstName} sx={{ width: 48, height: 48 }} />

          <Stack spacing={2}>
            <ListItemText
              primary={
                user
                  ? `${user?.firstName} ${user?.secondName} ${user?.lastName} ${user?.secondSurname}`
                  : 'Nombre no disponibel'
              }
              secondary={
                <Box display="flex" alignItems="center">
                  <Iconify
                    icon="fluent:mail-24-filled"
                    width={16}
                    sx={{ flexShrink: 0, mr: 0.5 }}
                  />
                  {user.email}
                </Box>
              }
              secondaryTypographyProps={{
                mt: 0.5,
                component: 'span',
                typography: 'caption',
                color: 'text.disabled',
              }}
            />

            <Stack spacing={1} direction="row">
              <IconButton
                size="small"
                color="error"
                sx={{
                  borderRadius: 1,
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
                  },
                }}
              >
                <Iconify width={18} icon="solar:phone-bold" />
              </IconButton>

              <Tooltip title="Ver detalles">
                <IconButton
                  size="small"
                  color="info"
                  sx={{
                    borderRadius: 1,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.16),
                    },
                  }}
                  onClick={() => ViewUserDetail.onTrue()}
                >
                  <Iconify width={18} icon="mdi:eye" />
                </IconButton>
              </Tooltip>

              <IconButton
                size="small"
                color="primary"
                sx={{
                  borderRadius: 1,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                }}
              >
                <Iconify width={18} icon="fluent:mail-24-filled" />
              </IconButton>

              <Tooltip title="Download CV">
                <IconButton
                  size="small"
                  color="secondary"
                  sx={{
                    borderRadius: 1,
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.16),
                    },
                  }}
                >
                  <Iconify width={18} icon="eva:cloud-download-fill" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <JobViewCandidateDetail
            currentUser={user}
            open={ViewUserDetail.value}
            onClose={ViewUserDetail.onFalse}
          />
        </Stack>
      ))}
    </Box>
  );
}
