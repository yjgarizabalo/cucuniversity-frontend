import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// _mock
import { _socials } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
// context
import { useCvContext } from 'src/context/cv/hooks/useCvContext'
import { useAuthContext } from 'src/auth/hooks';
//
import ProfileJob from './profile-job';

// ----------------------------------------------------------------------

export default function ProfileHome({ info }) {
  const { user: authUser } = useAuthContext();
  const { cv, getCvByUserIdAction } = useCvContext();

  useEffect(() => {
    if (authUser?.id) {
      getCvByUserIdAction(authUser.id);
    }
  }, [authUser?.id, getCvByUserIdAction]);

  const data = cv[0] || {};


  const renderAbout = (
    <Card>
      <CardHeader title="Sobre mi" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{data.aboutMe}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Residencia `}
            <Link variant="subtitle2" color="inherit">
              {data.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {data.personalEmail}
        </Stack>


        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Estudios `}
            <Link variant="subtitle2" color="inherit">
              {info.school} 🇺🇸
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2' }}
          >
            <Iconify
              icon={link.icon}
              width={24}
              sx={{
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link color="inherit">
              {link.value === 'linkedin' && data.socialNetwork}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );

  const renderJobs = (
    <ProfileJob />
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          {renderJobs}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  // posts: PropTypes.array,
};
