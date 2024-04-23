import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

// roles
const _roles = [
  'Administrador',
  'Coodinador Academico',
  'Estudiante',
];

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

export default function UserEdit({ currentUser }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombre es requerido'),
    secondName: Yup.string(),
    lastName: Yup.string().required('Apellido es requerido'),
    secondSurname: Yup.string().required('Segundo apellido es requerido'),
    identification: Yup.number().required('Identificación es requerida').moreThan(0, 'Debe ser mayor a 0').typeError('Valor compra es requerido'),
    program: Yup.string().required('Programa es requerido'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('El numero de telefono es requerido').min(10, 'Debe tener al menos 10 caracteres').max(10, 'Debe tener máximo 10 caracteres'),
    gender: Yup.string().required('Sexo es requerido'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      secondName: currentUser?.secondName || '',
      lastName: currentUser?.lastName || '',
      secondSurname: currentUser?.secondSurname || '',
      identification: currentUser?.identification || '',
      program: currentUser?.program || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      gender: currentUser?.gender || '',
      role: currentUser?.role || '',
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
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
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
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
                name="role"
                label="Rol"
                options={_roles}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) =>
                  <li {...props} key={option}>
                    {option}
                  </li>
                }
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Crear Usuario' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserEdit.propTypes = {
  currentUser: PropTypes.object,
};
