import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// config
import { CUC_HOST_API, PATH_AFTER_LOGIN } from 'src/config-global';
// routes
import { useSearchParams, useRouter } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { endpoints } from 'src/utils/axios';
import { Alert } from '@mui/material';

// ----------------------------------------------------------------------

export default function ModernLoginView() {
  const { login, errorMsg: inactiveUser } = useAuthContext();

  const router = useRouter();

  const [isMicrosoftSubmitting, setIsMicrosoftSubmitting] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const msParam = searchParams.get('ms');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'test-jobs@cucusa.org',
    password: '12345',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (msParam) {
      setErrorMsg(decodeURIComponent(msParam)); // Mostrar mensaje de error
      
      // Actualizar la URL sin el parámetro ms para redirigir al inicio
      const updatedUrl = `${window.location.origin}/auth/jwt/login?returnTo=${encodeURIComponent(returnTo)}`;
      window.history.replaceState(null, '', updatedUrl); // Reemplazar el historial con la URL de inicio
    }
  }, [msParam, returnTo]);;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleMicrosoftLogin = async () => {
    setIsMicrosoftSubmitting(true);
    // Aquí puedes llamar a tu función de autenticación con Microsoft
    // Simulando un retraso para demostrar el comportamiento de carga
    // Simula el inicio de sesión de Microsoft
    setTimeout(() => {
      // Aquí llamas a la API de Microsoft y manejas la respuesta
      // Al finalizar, establece isMicrosoftSubmitting a false
      setIsMicrosoftSubmitting(false);
    }, 2000); // Simula un retraso de 2 segundos
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, mt: 2 }}>
      <Typography variant="h4">Iniciar sesión</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg  && <Alert severity="error">{errorMsg }</Alert>}

      <RHFTextField name="email" label="Correo Electronico" />

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

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        Iniciar sesion
      </LoadingButton>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        loading={isMicrosoftSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
        onClick={() => {
          handleMicrosoftLogin();
          window.location.href = `${CUC_HOST_API}${endpoints.auth.login}`;
        }}
      >
        Iniciar sesión con mi cuenta Microsoft
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
