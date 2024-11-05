import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
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

const _gender = [
  'Masculino',
  'Femenino',
]

const _programs = [
  'Lic. en Administración de Negocios Internacionales',
  'Administración de Negocios Internacionales',
  'Funcionaro'
]

const _documentType = [
  'Cedula de Ciudadania',
  'Tarjeta de Identidad',
  'Cedula de Extranjeria'
]


export default function UserEditForm({ currentUser, currentRoles, open, onClose }, sx) {
  const { editUserAction } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombre es requerido'),
    secondName: Yup.string().optional(),
    lastName: Yup.string().required('Apellido es requerido'),
    secondSurname: Yup.string().optional(),
    identification: Yup.string().required('Identificación es requerida'),
    documentType: Yup.string().required('Tipo de Documento es requerido'),
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    program: Yup.string().required('Programa es requerido'),
    gender: Yup.string().required('Género es requerido'),
    phoneNumber: Yup.string().required('Teléfono es requerido'),
    roleId: Yup.object().shape({ id: Yup.string().required('Rol es requerido') }),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      secondName: currentUser?.secondName || '',
      lastName: currentUser?.lastName || '',
      secondSurname: currentUser?.secondSurname || '',
      identification: currentUser?.identification || '',
      documentType: currentUser?.documentType || '',
      email: currentUser?.email || '',
      program: currentUser?.program || '',
      gender: currentUser?.gender || '',
      phoneNumber: currentUser?.phoneNumber || '',
      roleId: typeof currentUser?.roleId === 'object'  ? currentUser.roleId : { id: currentUser?.roleId || '', name: '', description: '' }
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
      reset();
      onClose();
      const dataUser = {
        id: currentUser.id,
        firstName: data.firstName,
        secondName: data.secondName,
        lastName: data.lastName,
        secondSurname: data.secondSurname,
        identification: data.identification,
        documentType: data.documentType,
        email: data.email,
        program: data.program,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId.id,
        gender: data.gender
      };

      enqueueSnackbar('Usuaria actualizado con exito', 'success');
      editUserAction(dataUser);
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
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 1180 },
      }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Actualizar Usuario</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Actualizar usuario
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
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              {logo}
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
                  <RHFTextField name="secondName" label="Segundo nombre" />
                  <RHFTextField name="lastName" label="Primer apellido" />
                  <RHFTextField name="secondSurname" label="Segundo apellido" />
                  <RHFTextField name="identification" label="Identificación" />

                  <RHFAutocomplete
                    name="documentType"
                    label="Tipo de Documento"
                    options={_documentType}
                    getOptionLabel={(option) => option || ''}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderOption={(props, option) =>
                      <li {...props} key={option}>
                        {option}
                      </li>
                    }
                  />

                  <RHFAutocomplete
                    name="program"
                    label="Programa"
                    options={_programs}
                    getOptionLabel={(option) => option || ''}
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
                    getOptionLabel={(option) => option || ''}
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
                    placeholder="Selecciona Rol"
                    options={currentRoles}
                    getOptionLabel={(option) => option.name || currentUser.role.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderOption={(props, option) => {
                      if (option === '') {
                        return null
                      };
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>)
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Box>
        </DialogContent>


        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Actualizar
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

UserEditForm.propTypes = {
  currentUser: PropTypes.object,
  currentRoles: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func
};
