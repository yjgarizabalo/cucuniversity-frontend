import React, { useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { useRouter } from 'src/routes/hooks';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// auth
import { useAuthContext } from 'src/auth/hooks';
import { useCvContext } from 'src/context/cv/hooks/useCvContext';

// components
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Inicio',
    linkTo: '/',
  },
  {
    label: 'Perfil',
    linkTo: '/#1',
  },
  // {
  //   label: 'Configuración',
  //   linkTo: '/#2',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const { userCV, getCvByUserIdAction } = useCvContext();

  // const { user } = useMockedUser();

  const { logout, user: authUser } = useAuthContext();

  const popover = usePopover();

  useEffect(() => {
    if (authUser?.id) {
      getCvByUserIdAction(authUser.id);
    }
  }, [authUser?.id, getCvByUserIdAction]);

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={userCV && userCV.avatar}
          alt={authUser?.firstName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {authUser ? `${authUser.firstName} ${authUser.secondName} ${authUser.lastName} ${authUser.secondSurname}` : 'Invitado'}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {authUser?.email}
          </Typography>
        </Box>



        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="body2" sx={{ color: 'text.four' }} noWrap>
            {authUser?.role?.name}
          </Typography>
        </Box>


        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Cerrar sesión
        </MenuItem>
      </CustomPopover>
    </>
  );
}
