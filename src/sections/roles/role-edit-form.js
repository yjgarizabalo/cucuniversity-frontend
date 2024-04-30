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
// contexts
import { useRoleContext } from 'src/context/role/hooks/useRoleContext';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RoleEditForm({ cuerrentRoles, open, onClose }) {
  const { editRoleAccion } = useRoleContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Rol Es requerido'),
    description: Yup.string().required('Descripción es requerida'),
  });

  const defaultValues = useMemo(
    () => ({
      name: cuerrentRoles?.name || '',
      description: cuerrentRoles?.description || '',
    }),
    [cuerrentRoles]
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

    const editData = {
      id: cuerrentRoles.id,
      name: data.name,
      description: data.description,
    };

    try {
      reset();
      onClose();
      editRoleAccion(editData);
      enqueueSnackbar('Rol editado', 'con exito');
      console.log("Editado correctamente");
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
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Editar Rol</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Editar Rol - CUC University.
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

            <RHFTextField name="name" label="Ingres Nombre del Rol" />
            <RHFTextField name="description" label="Descripción" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Actualizar
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

RoleEditForm.propTypes = {
  cuerrentRoles: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
