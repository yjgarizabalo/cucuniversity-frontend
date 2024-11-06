import PropTypes from 'prop-types';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// routes
import { RouterLink } from 'src/routes/components';
// components
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function JobDetailsToolbar({ backLink, sx, ...other }) {
  const { permissions } = useAuthContext();

  const canApplyJob = permissions.includes('apply_jobOffers');

  const handleApllyJob = () => {
    console.log('Apply Job');
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
        startIcon={<Iconify icon="eva:checkmark-fill" width={16} />}
      >
        Atras
      </Button>

      <Box sx={{ flexGrow: 1 }} />
      {canApplyJob && (
        <LoadingButton
          color="inherit"
          variant="contained"
          loading={false}
          loadingIndicator="Loading…"
          endIcon={<Iconify icon="eva:checkmark-fill" />}
          onClick={handleApllyJob}
          sx={{ textTransform: 'capitalize' }}
        >
          Aplicar Oferta
        </LoadingButton>
      )}
    </Stack>
  );
}

JobDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  sx: PropTypes.object,
};
