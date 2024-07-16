import PropTypes from 'prop-types';
import { useMemo, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paths } from 'src/routes/paths';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// @mui
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components
import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import FormProvider from 'src/components/hook-form';

import AccountAddCv from './components/account-add-cv';
import FileStorageOverview from './components/account-add-overview';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

export default function AccountCv({ currentCv }) {

  const [files, setFiles] = useState([]);

  const upload = useBoolean();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const renderStorageOverview = (
    <FileStorageOverview
      total={GB}
      chart={{
        series: 76,
      }}
      data={[
        {
          name: 'Documents',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
        },
      ]}
    />
  );


  return (
    <FormProvider>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <AccountAddCv
            title="Recent Files 1"
            link={paths.dashboard.fileManager}
            onOpen={upload.onTrue}
            sx={{ mt: 2 }}
          />
        </Stack>
        <Grid xs={12} md={6} lg={4}>
          <UploadBox
            onDrop={handleDrop}
            placeholder={
              <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Upload file</Typography>
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

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderStorageOverview}</Box>

        </Grid>
      </Card>
    </FormProvider>
  )

}

AccountCv.propTypes = {
  currentCv: PropTypes.object,
}
