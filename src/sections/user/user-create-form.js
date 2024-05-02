import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useState, useMemo } from 'react';
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
import { fData } from 'src/utils/format-number';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// components
import Label from 'src/components/label';
import { useUserContext } from 'src/context/user/hooks/userUserContext';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar, RHFAutocomplete } from 'src/components/hook-form';
import Typography from '@mui/material/Typography';

//  ----------------------------------------------------------------------

const _gender = [
  'Masculino',
  'Femenino',
]

const _programs = [
  'Ingenieria de sistemas',
  'Lic. en Administración de Negocios Internacionales',
  'Administración de Negocios Internacionales',
  'Ingenieria de electronica',
  'Derecho',
  'Psicologia',
  'Medicina',
  'Enfermeria',
]


export default function UserCreateForm({ currentUser, currentRoles, open, onClose }) {
  const [selectedRoleId, setSelectedRoleId] = useState(currentUser?.roleId || 'Selecciona Rol');
  const { addUserAction } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event, value) => {
    setSelectedRoleId(value);
  };

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombre es requerido'),
    lastName: Yup.string().required('Apellido es requerido'),
    identification: Yup.string().required('Identificación es requerida'),
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
    program: Yup.string().required('Programa es requerido'),
    roleId: Yup.string(),
    gender: Yup.string().required('Género es requerido'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      identification: currentUser?.identification || '',
      email: currentUser?.email || '',
      password: currentUser?.password || '',
      program: currentUser?.program || '',
      roleId: currentUser?.roleId,
      gender: currentUser?.gender || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const dataUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      identification: data.identification,
      email: data.email,
      password: data.password,
      program: data.program,
      roleId: data.roleId,
      gender: data.gender
    };

    try {
      reset();
      onClose();
      enqueueSnackbar('Usuario creado con exito', 'success');
      addUserAction(dataUser);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 1180 },
      }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Crear Usuario</DialogTitle>

        <DialogContent>
          {/* <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Crear un nuevo usuario
          </Alert> */}


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
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                {currentUser && (
                  <Label
                    color={
                      (values.status === 'active' && 'success') ||
                      (values.status === 'banned' && 'error') ||
                      'warning'
                    }
                    sx={{ position: 'absolute', top: 24, right: 24 }}
                  >
                    {values.status}
                  </Label>
                )}

                <Box sx={{ mb: 5 }}>
                  <RHFUploadAvatar
                    name="avatarUrl"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 3,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.disabled',
                        }}
                      >
                        Solo permitimos *.jpeg, *.jpg, *.png, *.gif
                        <br /> capacidad maxima del archivo {fData(3145728)}
                      </Typography>
                    }
                  />
                </Box>


                {currentUser && (
                  <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                    <Button variant="soft" color="error">
                      Eliminar Usuario
                    </Button>
                  </Stack>
                )}
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

                  <RHFTextField name="firstName" label="Primer nombre" />
                  <RHFTextField name="secoundName" label="Segundo nombre" />
                  <RHFTextField name="lastName" label="Primer apellido" />
                  <RHFTextField name="secondSurname" label="Segundo apellido" />
                  <RHFTextField name="identification" label="Identificación" />

                  <RHFAutocomplete
                    name="program"
                    label="Programa"
                    options={_programs}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderOption={(props, option) =>
                      <li {...props} key={option}>
                        {option}
                      </li>
                    }
                  />

                  <RHFTextField name="email" label="Correo Electronico" />
                  <RHFAutocomplete
                    name="gender"
                    label="Genero"
                    options={_gender}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderOption={(props, option) =>
                      <li {...props} key={option}>
                        {option}
                      </li>
                    }
                  />
                  <RHFTextField name="phoneNumber" label="Teléfono" />
                  <RHFAutocomplete
                    name="roleId"
                    label="Rol"
                    options={currentRoles}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id} // Obtener solo el ID del rol como valor
                    value={selectedRoleId} // Valor seleccionado del ID del rol
                    onChange={handleChange} // Manejador de cambio para actualizar el ID del rol seleccionado
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    )}
                  />
                </Box>
              </Card>
            </Grid>
          </Box>
        </DialogContent>


        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!currentUser ? 'Crear Usuario' : 'Crear Usuario'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

UserCreateForm.propTypes = {
  currentUser: PropTypes.object,
  currentRoles: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func
};
