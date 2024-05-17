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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// components
import { useJobContext } from 'src/context/job/hooks/usejobContext';
import { useSnackbar } from 'src/components/snackbar';
// import { FormProvider } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFEditor } from 'src/components/hook-form';



// ----------------------------------------------------------------------

export default function JobCreateForm({ currentJob, open, onClose }) {
  const { addJobAction } = useJobContext();
  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    title: Yup.string().required('Título es requerido'),
    description: Yup.string().required('Descripción es requerida'),
    roleJob: Yup.string().required('Rol es requerido'),
    company: Yup.string().required('Compañía es requerida'),
    location: Yup.string().required('Ubicación es requerida'),
    employmentType: Yup.string().required('Tipo de empleo es requerido'),
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
      employmentType: currentJob?.employmentType || '',
      experience: currentJob?.experience || '',
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

  const onSubmit = handleSubmit(async (data) => {
    const dataJob = {
      title: data.title,
      description: data.description,
      roleJob: data.roleJob,
      company: data.company,
      location: data.location,
      employmentType: data.employmentType,
      experience: data.experience,
      salary: data.salary,
      workingHours: data.workingHours,
      benefits: data.benefits,
    };

    try {
      reset();
      onClose();
      enqueueSnackbar('Oferta creada con éxito', 'success');
      addJobAction(dataJob);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

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
        <DialogTitle>Crear Rol</DialogTitle>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Crear una nueva oferta laboral | CUC univeristy.
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
            <Grid xs={12} md={8}>
              <Card>
                <Stack spacing={3} sx={{ p: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Titulo</Typography>
                    <RHFTextField name="title" placeholder="Ex: Software Engineer..." />
                  </Stack>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Content</Typography>
                    <RHFEditor simple name="content" />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Guardar
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

JobCreateForm.propTypes = {
  currentJob: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
