import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// _mock
import {
  ROLES,
  JOB_WORKING_HOURS,
  JOB_BENEFIT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_LOCATION
} from 'src/_mock';

// components
import { useJobContext } from 'src/context/job/hooks/usejobContext';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFEditor, RHFTextField, RHFAutocomplete, RHFRadioGroup } from 'src/components/hook-form';


// ----------------------------------------------------------------------

export default function JobEditForm({ currentJob, open, onClose }) {
  const { editJobAction } = useJobContext();
  const { enqueueSnackbar } = useSnackbar();



  const NewJobSchema = Yup.object().shape({
    title: Yup.string().required('Título es requerido'),
    description: Yup.string().required('Descripción es requerida'),
    roleJob: Yup.string().required('Rol es requerido'),
    company: Yup.string().required('Compañía es requerida'),
    location: Yup.string().required('Ubicación es requerida'),
    experience: Yup.string().required('Experiencia es requerida'),
    salary: Yup.string().required('Salario es requerido'),
    workingHours: Yup.string().optional(),
    benefits: Yup.string().optional(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentJob?.title || '',
      description: currentJob?.description || '',
      roleJob: currentJob?.roleJob || '',
      company: currentJob?.company || '',
      location: currentJob?.location || '',
      experience: currentJob?.experience,
      salary: currentJob?.salary || '',
      workingHours: currentJob?.workingHours || '',
      benefits: currentJob?.benefits || '',
    }),
    [currentJob]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const { reset, handleSubmit, formState: { isSubmitting } } = methods;

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, reset, defaultValues]);


  const onSubmit = handleSubmit(async (data) => {
    const dataJob = {
      id: currentJob.id,
      title: data.title,
      description: data.description,
      roleJob: data.roleJob,
      company: data.company,
      location: data.location,
      experience: data.experience,
      salary: data.salary,
      workingHours: data.workingHours,
      benefits: data?.benefits,
    };

    try {
      reset();
      onClose();
      enqueueSnackbar('Oferta actulizada con exito', 'success');
      editJobAction(dataJob);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <Grid xs={12} md={8}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Titulo</Typography>
            <RHFTextField name="title" placeholder="Ex: Software Engineer..." />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Descripción</Typography>
            <RHFEditor name="description" />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderContent = (
    <Grid xs={12} md={4}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Experiencia</Typography>
            <RHFRadioGroup
              row
              spacing={4}
              name="experience"
              options={JOB_EXPERIENCE_OPTIONS}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Rol o cargo</Typography>
            <RHFAutocomplete
              name="roleJob"
              placeholder="Selecciona Rol"
              autoHighlight
              options={ROLES.map((option) => option || '')}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Empresa</Typography>
            <RHFTextField name="company" placeholder="Ex: CUC University..." />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Ubicación</Typography>
            <RHFAutocomplete
              name="location"
              placeholder="Seleccione Ubicación"
              options={JOB_LOCATION.map((option) => option || '')}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Horario Laboral</Typography>
            <RHFAutocomplete
              name="workingHours"
              placeholder="Seleccione horario"
              options={JOB_WORKING_HOURS.map((option) => option || '')}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle2">Salario</Typography>

            <RHFTextField
              name="salary"
              placeholder="0.00"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Benficios</Typography>
            <RHFRadioGroup row spacing={4} name="benefits" options={JOB_BENEFIT_OPTIONS} />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  const renderActions = (
    <DialogActions>
      <Button variant="outlined" onClick={onClose}>
        Cancelar
      </Button>
      <LoadingButton type="submit" variant="contained" loadingDetail={isSubmitting}>
        Actulizar
      </LoadingButton>
    </DialogActions>
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Editar Oferta</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Editar oferta laboral | CUC univeristy.
          </Alert>
          <Box
            rowGap={7}
            columnGap={3}
            display="grid"
            gridAutoColumns={{
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >

            {renderDetails}

            {renderContent}

            {renderActions}

          </Box>
        </DialogContent>

      </FormProvider>
    </Dialog>
  );
}

JobEditForm.propTypes = {
  currentJob: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
