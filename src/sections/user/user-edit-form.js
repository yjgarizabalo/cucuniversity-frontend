// //import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// import { useMemo } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// // import MenuItem from '@mui/material/MenuItem';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// // --------------------------------------------------------------------
// // assets
// // import { countries } from 'src/assets/data';
// // components
// // import Iconify from 'src/components/iconify';
// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// // roles
// const _roles = [
//   'Administrador',
//   'Coodinador Academico',
//   'Estudiante',
// ];

// const _gender = [
//   'Masculino',
//   'Femenino',
// ]

// const _programs = [
//   'Ingenieria de sistemas',
//   'Lic. en Administración de Negocios Internacionales',
//   'Administración de Negocios Internacionales',
//   'Ingenieria de electronica',
//   'Derecho',
//   'Psicologia',
//   'Medicina',
//   'Enfermeria',
// ]

// export default function UserEditForm({ currentUser, open, onClose }) {
//   const { enqueueSnackbar } = useSnackbar();

//   const NewUserSchema = Yup.object().shape({
//     firstName: Yup.string().required('Nombre es requerido'),
//     secondName: Yup.string().required('Segundo nombre es requerido'),
//     lastName: Yup.string().required('Apellido es requerido'),
//     secondSurname: Yup.string().required('Segundo apellido es requerido'),
//     identification: Yup.number().required('Identificación es requerida').moreThan(0, 'Debe ser mayor a 0').typeError('Valor compra es requerido'),
//     program: Yup.string().required('Programa es requerido'),
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     phoneNumber: Yup.string().required('El numero de telefono es requerido').min(10, 'Debe tener al menos 10 caracteres').max(10, 'Debe tener máximo 10 caracteres'),
//     gender: Yup.string().required('Sexo es requerido'),
//     state: Yup.string().required('State is required'),
//     role: Yup.string().required('Role is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       firstName: currentUser?.firstName || '',
//       secondName: currentUser?.secondName || '',
//       lastName: currentUser?.lastName || '',
//       secondSurname: currentUser?.secondSurname || '',
//       identification: currentUser?.identification || '',
//       program: currentUser?.program || '',
//       email: currentUser?.email || '',
//       phoneNumber: currentUser?.phoneNumber || '',
//       gender: currentUser?.gender || '',
//       state: currentUser?.state || '',
//       role: currentUser?.role || '',
//     }),
//     [currentUser]
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewUserSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       reset();
//       onClose();
//       enqueueSnackbar('Actulizar usuario', 'Exitoso');
//       console.info('DATA', data);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   return (
//     <Dialog
//       fullWidth
//       maxWidth={false}
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: { maxWidth: 720 },
//       }}
//     >
//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         <DialogTitle>Información del Usuario</DialogTitle>

//         <DialogContent>
//           <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
//             Actualizar información de {`${currentUser.firstName} ${currentUser.lastName}`}
//           </Alert>

//           <Box
//             rowGap={3}
//             columnGap={2}
//             display="grid"
//             gridTemplateColumns={{
//               xs: 'repeat(1, 1fr)',
//               sm: 'repeat(2, 1fr)',
//             }}
//           >
//             {/* <RHFSelect name="status" label="Status">
//               {USER_STATUS_OPTIONS.map((status) => (
//                 <MenuItem key={status.value} value={status.value}>
//                   {status.label}
//                 </MenuItem>
//               ))}
//             </RHFSelect> */}

//             {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} /> */}

//             <RHFTextField name="firstName" label="Primer nombre" />
//             <RHFTextField name="secoundName" label="Segundo nombre" />
//             <RHFTextField name="lastName" label="Apellido" />
//             <RHFTextField name="secondSurname" label="Segundo apellido" />
//             <RHFTextField name="identification" label="Identificación" />

//             <RHFAutocomplete
//               name="program"
//               label="Programa"
//               options={_programs}
//               getOptionLabel={(option) => option}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderOption={(props, option) =>
//                 <li {...props} key={option}>
//                   {option}
//                 </li>
//               }
//             />
//             <RHFTextField name="email" label="Email Address" />
//             <RHFAutocomplete
//               name="gender"
//               label="Genero"
//               options={_gender}
//               getOptionLabel={(option) => option}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderOption={(props, option) =>
//                 <li {...props} key={option}>
//                   {option}
//                 </li>
//               }
//             />
//             <RHFTextField name="phoneNumber" label="Phone Number" />


//             {/* <RHFAutocomplete
//               name="country"
//               label="Country"
//               options={countries.map((country) => country.label)}
//               getOptionLabel={(option) => option}
//               renderOption={(props, option) => {
//                 const { code, label, phone } = countries.filter(
//                   (country) => country.label === option
//                 )[0];

//                 if (!label) {
//                   return null;
//                 }

//                 return (
//                   <li {...props} key={label}>
//                     <Iconify
//                       key={label}
//                       icon={`circle-flags:${code.toLowerCase()}`}
//                       width={28}
//                       sx={{ mr: 1 }}
//                     />
//                     {label} ({code}) +{phone}
//                   </li>
//                 );
//               }}
//             /> */}

//             {/* <RHFTextField name="state" label="State/Region" /> */}
//             <RHFAutocomplete
//               name="role"
//               label="Role"
//               options={_roles}
//               getOptionLabel={(option) => option}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderOption={(props, option) =>
//                 <li {...props} key={option}>
//                   {option}
//                 </li>
//               }
//             />
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button variant="outlined" onClick={onClose}>
//             Cancelar
//           </Button>

//           <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//             Actualizar
//           </LoadingButton>
//         </DialogActions>
//       </FormProvider>
//     </Dialog>
//   );
// }

// UserEditForm.propTypes = {
//   currentUser: PropTypes.object,
//   onClose: PropTypes.func,
//   open: PropTypes.bool,
// };
