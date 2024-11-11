import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// utils

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';

// components
import { useUserContext } from 'src/context/user/hooks/userUserContext';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

//  ----------------------------------------------------------------------

const _gender = ['', 'Masculino', 'Femenino'];

const _programs = [
  '',
  'Lic. en Administración de Negocios Internacionales',
  'Administración de Negocios Internacionales',
  'Funcionaro',
];

const _documentType = ['', 'Cedula de Ciudadania', 'Tarjeta de Identidad', 'Cedula de Extranjeria'];

export default function UserCreateForm({ currentUser, currentRoles, open, onClose }, sx) {
  const { addUserAction } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombre es requerido'),
    secoundName: Yup.string().optional(),
    lastName: Yup.string().required('Apellido es requerido'),
    secondSurname: Yup.string().optional(),
    documentType: Yup.string().required('Tipo de documento es requerido'),
    identification: Yup.string().required('Identificación es requerida'),
    email: Yup.string().email('Email no válido').required('Email es requerido')
    .email('El correo debe tener un formato válido.')
    .matches(/^[a-zA-Z0-9._%+-]+@cucusa\.org$/, 'Solo correos "cucusa.org".')
    .required('El correo es requerido.'),
    program: Yup.string().required('Programa es requerido'),
    gender: Yup.string().required('Género es requerido'),
    roleId: Yup.object().shape({ id: Yup.string().required('Rol es requerido') }),
    password: Yup.string().required('Contraseña es requerida'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es requerida'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      secondName: currentUser?.secondName || '',
      lastName: currentUser?.lastName || '',
      secondSurname: currentUser?.secondSurname || '',
      documentType: currentUser?.documentType || '',
      identification: currentUser?.identification || '',
      email: currentUser?.email || '',
      program: currentUser?.program || '',
      gender: currentUser?.gender || '',
      roleId: currentUser?.roleId || { id: '', name: '', description: '' },
      password: currentUser?.password || '',
      confirmPassword: '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const dataUser = {
      firstName: data.firstName,
      secondName: data.secondName,
      lastName: data.lastName,
      secondSurname: data.secondSurname,
      documentType: data.documentType,
      identification: data.identification,
      email: data.email,
      program: data.program,
      roleId: data.roleId.id,
      gender: data.gender,
      password: data.password,
    };

    try {
      await addUserAction(dataUser);
      reset();
      onClose();
      enqueueSnackbar('Usuario creado con exito', 'success');
    } catch (error) {
      console.error(error);
    }
  });

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  const logo = (
    <Box
      component="img"
      src="/logo/logo_cucuniversity.svg"
      sx={{ width: 150, height: 40, cursor: 'pointer', ...sx }}
    />
  );

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      PaperProps={{
        sx: { maxWidth: 1180 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Crear Usuario</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Crear un nuevo usuario
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
            <Grid xs={12} md={4}>
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>{logo}</Card>
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
                  <RHFTextField name="firstName" label="Primer nombre" />
                  <RHFTextField name="secondName" label="Segundo nombre" />
                  <RHFTextField name="lastName" label="Primer apellido" />
                  <RHFTextField name="secondSurname" label="Segundo apellido" />
                  <RHFTextField name="identification" label="Identificación" />

                  <RHFAutocomplete
                    name="documentType"
                    label="Tipo de documento"
                    options={_documentType}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderOption={(props, option) => (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    )}
                  />

                  <RHFAutocomplete
                    name="program"
                    label="Programa"
                    options={_programs}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderOption={(props, option) => (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    )}
                  />

                  <RHFTextField name="email" label="Correo Electronico" />
                  <RHFAutocomplete
                    name="gender"
                    label="Genero"
                    options={_gender}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderOption={(props, option) => (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    )}
                  />

                  <RHFAutocomplete
                    name="roleId"
                    label="Rol"
                    placeholder="Selecciona Rol"
                    options={[{ id: '', name: '', description: '' }, ...currentRoles]}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderOption={(props, option) => {
                      if (option === '') {
                        return null;
                      }
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                  />
                  <RHFTextField name="password" label="Contraseña" type="password" />
                  <RHFTextField name="confirmPassword" label="Confirmar Contraseña" type="password" />
                </Box>
              </Card>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Crear Usuario
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserCreateForm.propTypes = {
  currentUser: PropTypes.object,
  currentRoles: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
