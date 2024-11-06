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
import JobEditForm from './job-edit-form';

// ----------------------------------------------------------------------

export default function JobItem({ job, onView, onDelete }) {
  const { permissions } = useAuthContext();

  const popover = usePopover();

  const { title, company, createAt, experience, salary, roleJob } = job;

  const EditJob = useBoolean();

  const canViewJobDetail = permissions.includes('read_jobOffers');
  const canUpdateJob = permissions.includes('update_jobOffers');
  const canDeleteJob = permissions.includes('delete_jobOffers');

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={company.name}
            src={company.logo}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2 }}
          />

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link component={RouterLink} color="inherit">
                {title}
              </Link>
            }
            secondary={`Publicado: ${fDate(createAt)}`}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
          {[
            {
              label: experience,
              icon: <Iconify width={16} icon="carbon:skill-level-basic" sx={{ flexShrink: 0 }} />,
            },
            {
              label: salary,
              icon: <Iconify width={16} icon="solar:wad-of-money-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: roleJob,
              icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
            },
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ color: 'text.disabled', minWidth: 0 }}
            >
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {canViewJobDetail && (
          <MenuItem
            onClick={() => {
              popover.onClose();
              onView();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            Ver
          </MenuItem>
        )}

        {canUpdateJob && (
          <MenuItem
            onClick={() => {
              EditJob.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Editar
          </MenuItem>
        )}

        {canDeleteJob && (
          <MenuItem
            onClick={() => {
              popover.onClose();
              onDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Eliminar
          </MenuItem>
        )}
      </CustomPopover>

      <JobEditForm currentJob={job} open={EditJob.value} onClose={EditJob.onFalse} />
    </>
  );
}

JobItem.propTypes = {
  job: PropTypes.object,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
};
