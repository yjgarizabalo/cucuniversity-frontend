import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { fData } from 'src/utils/format-number';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

// context
import { useCvContext } from 'src/context/cv/hooks/useCvContext'
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { user: authUser } = useAuthContext();

  const {cv, editCvAction } = useCvContext();

  const { enqueueSnackbar } = useSnackbar();

  console.log(authUser);

  const UpdateUserSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Teléfono es requerido'),
    address: Yup.string().required('Dirección es requerida'),
    country: Yup.string().required('País es requerido'),
    state: Yup.string().required('Departamento / Estado es requerido'),
    city: Yup.string().required('Municipio / Ciudad es requerido'),
    personalEmail: Yup.string().email('Email no válido'),
    socialNetwork: Yup.string().optional(),
    aboutMe: Yup.string().optional(),
  });


  const defaultValues = useMemo(
    () => ({
      displayName: `${authUser.firstName} ${authUser.lastName} ${authUser.secondSurname}` || 'Nombre no disponible',
      email: authUser?.email || '',
      phoneNumber: cv?.phoneNumber || '',
      address: cv?.address || '',
      country: cv?.country || '',
      state: cv?.state || '',
      city: cv?.city || '',
      socialNetwork: cv?.socialNetwork || '',
      aboutMe: cv?.aboutMe || '',
    }),
    [authUser, cv]
  )

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {


    try {
      const { displayName, email, ...restData } = data;
      const dataCv = {
        ...restData,
        id: authUser.id,
        phoneNumber: data.phoneNumber,
        address: data.address,
        country: data.country,
        state: data.state,
        city: data.city,
        personalEmail: data.personalEmail,
        socialNetwork: data.socialNetwork,
        aboutMe: data.aboutMe,
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Hoja de vida actualizada', 'success' );
      editCvAction(dataCv);
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
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
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
                  Permitido *.jpeg, *.jpg, *.png, *.gif
                  <br /> tamaño máximo de  {fData(3145728)}
                </Typography>
              }
            />

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
              <RHFTextField name="displayName" label="Nombre completo" disabled/>
              <RHFTextField name="email" label="Correo instucional" disabled/>
              <RHFTextField name="phoneNumber" label="Teléfono" />
              <RHFTextField name="address" label="Dirección" />

              <RHFAutocomplete
                name="country"
                label="Paies"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />


              <RHFTextField name="state" label="Departamento / Estado" />
              <RHFTextField name="city" label="municipio / Ciudad" />
              <RHFTextField name="personalEmail" label="Correo personal" />
            </Box>



            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="socialNetwork" label="Linkedin" />
              <RHFTextField name="aboutMe" multiline rows={4} label="Sobre mi" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Guardar cambios
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
