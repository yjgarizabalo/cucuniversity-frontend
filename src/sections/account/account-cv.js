import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import  supabase from 'src/utils/supabaseClient';
import { useSnackbar } from 'src/components/snackbar';
import { Card, Stack, Typography, Button, IconButton, Box, Grid } from '@mui/material';
import Iconify from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';
import { useCvContext } from 'src/context/cv/hooks/useCvContext';
import { useAuthContext } from 'src/auth/hooks';
import { UploadBox } from 'src/components/upload';


export default function AccountCv() {
  const { user: authUser } = useAuthContext();
  const { userCV, addCvAction, editCvAction, getCvByUserIdAction, loading } = useCvContext();
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (authUser?.id) {
      getCvByUserIdAction(authUser.id);
    }
  }, [authUser?.id, getCvByUserIdAction]);

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const pdfFile = acceptedFiles[0];
  //     if (pdfFile && pdfFile.type === "application/pdf") {
  //       setFile(pdfFile);
  //       enqueueSnackbar('Archivo PDF listo para subir', { variant: 'info' });
  //     } else {
  //       enqueueSnackbar('Solo se permite cargar archivos PDF', { variant: 'error' });
  //     }
  //   },
  //   [enqueueSnackbar]
  // );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log("Archivos aceptados:", acceptedFiles); // Verifica los archivos recibidos
      const pdfFile = acceptedFiles[0];
      if (pdfFile && (pdfFile.type === "application/pdf" || pdfFile.name.endsWith(".pdf"))) {
        setFile(pdfFile);
        enqueueSnackbar('Archivo PDF listo para subir', { variant: 'info' });
      } else {
        enqueueSnackbar('Solo se permite cargar archivos PDF', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );
  

  const handleUpload = async () => {
    try {
      if (!file || !authUser) return;
      setUploading(true);
      const fileName = `cv_${authUser.id}_${Date.now()}.pdf`;

      // Subir el archivo a Supabase
      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(`cv/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('cvs')
        .getPublicUrl(`cv/${fileName}`);

      if (!publicUrlData?.publicUrl) {
        throw new Error("No se pudo obtener la URL pública del archivo PDF");
      }

      const cvData = {
        cvFile: publicUrlData.publicUrl,
        userId: authUser.id,
      };


      if (userCV !== null && userCV.id) {
        await editCvAction(userCV.id, cvData);
        enqueueSnackbar('CV actualizado exitosamente', 'success');
      } else {
        await addCvAction(cvData);
        enqueueSnackbar('CV agregado exitosamente', 'success');
      }

      setFile(null);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al subir el archivo', 'error' );
    } finally {
      setUploading(false);
    }
  };

  // const handleClearCvFile = async () => {
  //   try {
  //     if (cv.length > 0 && cv[0].id) {
  //       // Actualiza el CV estableciendo el campo cvFile a null para "eliminar" el archivo
  //       await editCvAction(cv[0].id, { cvFile: null });
  //       enqueueSnackbar('CV eliminado exitosamente', { variant: 'success' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     enqueueSnackbar('Error al eliminar el archivo', { variant: 'error' });
  //   }
  // };

  return loading ? (
    <LoadingScreen />
  ) : (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6">Subir Hoja de Vida</Typography>

      <Grid item xs={12} md={6} lg={4}>
        <UploadBox
          onDrop={handleDrop}
          accept="application/pdf"
          placeholder={
            <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
              <Iconify icon="eva:cloud-upload-fill" width={40} />
              <Typography variant="body2">Arrastra un archivo PDF aquí</Typography>
            </Stack>
          }
          sx={{
            mb: 3,
            py: 2.5,
            width: 'auto',
            height: 'auto',
            borderRadius: 1.5,
          }}
        />
      </Grid>


      {file && (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Typography variant="body2">{file.name}</Typography>
          <Button variant="contained" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Subiendo...' : 'Subir'}
          </Button>
        </Stack>
      )}

      {userCV !== null && userCV.cvFile && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">Archivo Actual:</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" component="a" href={userCV.cvFile} target="_blank" rel="noopener noreferrer">
              Ver PDF
            </Typography>
            <IconButton color="error" component="a" href={userCV.cvFile} target="_blank" rel="noopener noreferrer">
              <Iconify icon="eva:eye-outline"  />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Card>
  );
}

