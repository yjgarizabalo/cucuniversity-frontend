// import PropTypes from 'prop-types';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
// import ListItemText from '@mui/material/ListItemText';
// // utils
// import { fData } from 'src/utils/format-number';
// // components
// import Chart, { useChart } from 'src/components/chart';

// // ----------------------------------------------------------------------

// export default function AccountAddOverview({ data, total, chart, ...other }) {
//   const theme = useTheme();

//   const { colors = [theme.palette.info.main, theme.palette.info.dark], series, options } = chart;

//   const chartOptions = useChart({
//     chart: {
//       offsetY: -16,
//       sparkline: {
//         enabled: true,
//       },
//     },
//     grid: {
//       padding: {
//         top: 24,
//         bottom: 24,
//       },
//     },
//     legend: {
//       show: false,
//     },
//     plotOptions: {
//       radialBar: {
//         startAngle: -90,
//         endAngle: 90,
//         hollow: {
//           size: '56%',
//         },
//         dataLabels: {
//           name: {
//             offsetY: 8,
//           },
//           value: {
//             offsetY: -40,
//           },
//           total: {
//             label: `Used of ${fData(total)} / 50GB`,
//             color: theme.palette.text.disabled,
//             fontSize: theme.typography.body2.fontSize,
//             fontWeight: theme.typography.body2.fontWeight,
//           },
//         },
//       },
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         colorStops: [
//           { offset: 0, color: colors[0] },
//           { offset: 100, color: colors[1] },
//         ],
//       },
//     },
//     ...options,
//   });

//   return (
//     <Card {...other}>
//       <Chart type="radialBar" series={[series]} options={chartOptions} height={360} />

//       <Stack spacing={3} sx={{ px: 3, pb: 5 }}>
//         {data.map((category) => (
//           <Stack key={category.name} spacing={2} direction="row" alignItems="center">
//             <Box sx={{ width: 40, height: 40 }}>{category.icon}</Box>

//             <ListItemText
//               primary={category.name}
//               secondary={`${category.filesCount} files`}
//               secondaryTypographyProps={{
//                 mt: 0.5,
//                 component: 'span',
//                 typography: 'caption',
//                 color: 'text.disabled',
//               }}
//             />

//             <Box sx={{ typography: 'subtitle2' }}> {fData(category.usedStorage)} </Box>
//           </Stack>
//         ))}
//       </Stack>
//     </Card>
//   );
// }

// AccountAddOverview.propTypes = {
//   chart: PropTypes.object,
//   data: PropTypes.array,
//   total: PropTypes.number,
// };


import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
// components
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

// ----------------------------------------------------------------------

export default function AccountAddOverview({
  title = 'Upload Files',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  ...other
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

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

  const handleUpload = () => {
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label="Folder name"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleUpload}
        >
          Upload
        </Button>

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )}

        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
}

AccountAddOverview.propTypes = {
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
