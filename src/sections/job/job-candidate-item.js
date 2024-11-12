import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fDate } from 'src/utils/format-time';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { useAuthContext } from 'src/auth/hooks';
import { alpha, Tooltip } from '@mui/material';
import JobEditForm from './job-edit-form';
import JobViewCandidateDetail from './job-view-candidate-detail';


// ----------------------------------------------------------------------

export default function JobCandidateItem({ user }) {
  const ViewUserDetail = useBoolean();

  return (
    <>
      <Stack component={Card} direction="row" spacing={2} key={user.id} sx={{ p: 3 }}>
            <IconButton sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>

            <Avatar
              alt={user.firstName}
              src={user.cv?.avatar || user.firstName}
              sx={{ width: 48, height: 48 }}
            />

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
           
          </Stack>
   <JobViewCandidateDetail
   currentUser={user}
   open={ViewUserDetail.value}
   onClose={ViewUserDetail.onFalse}
 />
 </>
  );
}

JobCandidateItem.propTypes = {
  user: PropTypes.object,
};
