/* eslint-disable no-restricted-globals */
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { IconButton, InputAdornment } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { useUserContext } from 'src/context/user/hooks/userUserContext';
import { useSnackbar } from 'notistack';

// eslint-disable-next-line react/prop-types
export default function UserPasswordEditForm({ open, onClose, currentUser }) {
  const { editUserAction } = useUserContext();
  const password = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Debe tener al menos 8 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra en mayúscula')
      .matches(/[!@#$%^&*(),.?":{}+|<>]/, 'Debe contener un caracter especial')
      .required('Campo requerido'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Campo requerido'),
  });

  const defaultValues = useMemo(() => ({
    password: '',
    confirmPassword: '',
  }), []);

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const dataUser = {
      // eslint-disable-next-line react/prop-types
      id: currentUser.id,
      password: data.password,
    };

    try {
      await editUserAction(dataUser);
      reset();
      onClose();
      enqueueSnackbar('Contraseña actualizada con éxito', 'success');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    setTimeout(() => {
      reset({ password: '', confirmPassword: '' });
    }, 100);
  }, [reset, onClose]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onCancel}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Actualizar contraseña</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Actualice o cambie la contraseña del usuario.
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField
              name="password"
              label="Contraseña"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="confirmPassword"
              label="Confirmar contraseña"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Actualizar
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
