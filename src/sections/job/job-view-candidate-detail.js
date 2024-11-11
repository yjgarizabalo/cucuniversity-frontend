import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JobViewCandidateDetail({ currentUser, open, onClose }) {

  const defaultValues = useMemo(
    () => ({
      displayName: currentUser
        ? `${currentUser.firstName} ${currentUser.lastName} ${currentUser.secondSurname}`
        : 'Invitado',
      email: currentUser?.email || '',
      avatar: currentUser?.cv.avatar || currentUser?.firstName,
      phoneNumber: currentUser?.cv.phoneNumber || '',
      address: currentUser?.cv.address || '',
      country: currentUser?.cv.country || '',
      state: currentUser?.cv.state || '',
      city: currentUser?.cv.city || '',
      personalEmail: currentUser?.cv.personalEmail || '',
      socialNetwork: currentUser?.cv.socialNetwork || '',
      aboutMe: currentUser?.cv.aboutMe || '',
      documentType: currentUser?.documentType || '',
      gender: currentUser?.gender || '',
      identification: currentUser?.identification || '',
      program: currentUser?.program || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    defaultValues,
  });

  const AvatarImg = (
    <Box component="img" src={currentUser.cv.avatar} sx={{ width: 150, height: 150 }} />
  );

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 1080 },
      }}
    >
      <DialogTitle>Hoja de vida del candidato</DialogTitle>

      <DialogContent>
        <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
          Datos del candidato | CUC univeristy.
        </Alert>
        <FormProvider methods={methods}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
                {AvatarImg}
              </Card>
            </Grid>

            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="displayName" label="Nombre completo" disabled />
                  <RHFTextField name="documentType" label="Tipo de documento" disabled />
                  <RHFTextField name="identification" label="Numero de identificacion" disabled />
                  <RHFTextField name="gender" label="Genero" disabled />
                  <RHFTextField name="program" label="Programa" disabled />
                  <RHFTextField name="email" label="Correo instucional" disabled />
                  <RHFTextField name="phoneNumber" label="Teléfono" disabled/>
                  <RHFTextField name="address" label="Dirección" disabled/>
                  <RHFTextField name="country" label="Pais" disabled/>
                  <RHFTextField name="state" label="Departamento / Estado" disabled/>
                  <RHFTextField name="city" label="municipio / Ciudad" disabled/>
                  <RHFTextField name="personalEmail" label="Correo personal" disabled />
                </Box>

                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <RHFTextField name="socialNetwork" label="Linkedin" disabled/>
                  <RHFTextField name="aboutMe" multiline rows={4} label="Sobre mi" disabled/>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Salir
            </Button>
          </DialogActions>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

JobViewCandidateDetail.propTypes = {
  currentUser: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
