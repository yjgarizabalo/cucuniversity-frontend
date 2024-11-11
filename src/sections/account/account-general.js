import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
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
import  supabase from 'src/utils/supabaseClient';
// assets
import { countries } from 'src/assets/data';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'src/config-global';
// components
import { LoadingScreen } from 'src/components/loading-screen';
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

  const { userCV, editCvAction, addUserCvAction, getCvByUserIdAction, loading } = useCvContext();

  const [avatarFile, setAvatarFile] = useState(null);


  const { enqueueSnackbar } = useSnackbar();

  const UpdateCvShema = Yup.object().shape({
    avatar: Yup.string().optional(),
    phoneNumber: Yup.string().required('Teléfono es requerido'),
    address: Yup.string().required('Dirección es requerida'),
    country: Yup.string().required('País es requerido'),
    state: Yup.string().required('Departamento / Estado es requerido'),
    city: Yup.string().required('Municipio / Ciudad es requerido'),
    personalEmail: Yup.string().email('Email no válido'),
    socialNetwork: Yup.string().optional(),
    aboutMe: Yup.string().optional(),
  });

  const defaultValues = useMemo(() => ({
      displayName: authUser ? `${authUser.firstName} ${authUser.lastName} ${authUser.secondSurname}`: 'Invitado',
      email: authUser?.email || '',
      avatar: userCV?.avatar || '',
      phoneNumber: userCV?.phoneNumber || '',
      address: userCV?.address || '',
      country: userCV?.country || '',
      state: userCV?.state || '',
      city: userCV?.city || '',
      personalEmail: userCV?.personalEmail || '',
      socialNetwork: userCV?.socialNetwork || '',
      aboutMe: userCV?.aboutMe || '',
    }), [authUser, userCV]);

  const methods = useForm({
    resolver: yupResolver(UpdateCvShema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (authUser?.id) {
      getCvByUserIdAction(authUser.id);
    }
  }, [authUser?.id, getCvByUserIdAction]);

  useEffect(() => {
    if (userCV !== null) {
      reset(defaultValues);
    }
  }, [userCV, reset, defaultValues]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { displayName, email, ...restData } = data;
      const dataCv = {
        ...restData,
        userId: authUser.id,
        avatar: data.avatar,
        phoneNumber: data.phoneNumber,
        address: data.address,
        country: data.country,
        state: data.state,
        city: data.city,
        personalEmail: data.personalEmail,
        socialNetwork: data.socialNetwork,
        aboutMe: data.aboutMe,
      };

      if (avatarFile) {
        const fileName = `avatar_${Date.now()}`;

        const { error: avatarError } = await supabase.storage
          .from('avatars')
          .upload(`avatar/${fileName}`, avatarFile);

        if (avatarError) {
          throw avatarError;
        }

        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(`avatar/${fileName}`);


        if (publicUrlData?.publicUrl) {
          dataCv.avatar = publicUrlData.publicUrl;
        } else {
          throw new Error("No se pudo obtener la URL pública del avatar");
        }
      }

      if (userCV !== null && userCV.id) {
        const cvId = Number(userCV.id);
        await editCvAction(cvId, dataCv);
        enqueueSnackbar('Hoja de vida actualizada', 'success');
      } else {
        await addUserCvAction(dataCv);
        enqueueSnackbar('Hoja de vida creada', 'success');
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al actualizar la hoja de vida', 'error');
    }
  });


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setAvatarFile(file);
      setValue('avatar', newFile, { shouldValidate: true });
      enqueueSnackbar('Imagen lista para subir', 'info');
    },
    [setValue, enqueueSnackbar]
  );



  return (
    loading ? <LoadingScreen /> :
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
              <RHFUploadAvatar
                name="avatar"
                maxSize={2145728}
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
                    <br /> tamaño máximo de  {fData(2145728)}
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
                <RHFTextField name="displayName" label="Nombre completo" disabled />
                <RHFTextField name="email" label="Correo instucional" disabled />
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
