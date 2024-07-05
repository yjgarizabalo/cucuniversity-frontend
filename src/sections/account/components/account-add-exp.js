import { useCallback } from 'react';
import { useFormContext, Controller, useFieldArray,  } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
// components
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
// mocks
import { _yearsExperiencie } from 'src/_mock/_cv';

// ----------------------------------------------------------------------

export default function AccountAddExperincies() {
  const { control, watch, resetField } = useFormContext();

  const values = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exp',
  });

  const handleAdd = () => {
    append({
      role: '',
      yearsExperience: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`exp[${index}].role`);
    },
    [resetField]
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Experiencias laborales:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>

        {fields.map((item, index) => (
          <Stack key={item.id} spacing={1.5}>
            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ p: 3 }}
            >
              <RHFTextField
                name={`exp[${index}].cargo`}
                label="Cargo"
                value={values.invoiceNumber}
              />

              <RHFSelect
                fullWidth
                name={`exp[${index}].yearsExperience`}
                label="Años de experiencia"
                placeholder="Años de experiencia"
                PaperPropsSx={{ textTransform: 'capitalize' }}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                >
                  Años de experiencia
                </MenuItem>
                {_yearsExperiencie.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Controller
                name={`exp[${index}].startDate`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Fecha inicio"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name={`exp[${index}].endDate`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Finalizo"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <Stack alignItems="flex-end" spacing={1.5}>
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              >
                Quitar
              </Button>
            </Stack>

          </Stack>

        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Agregar Experiencia
        </Button>
      </Stack>

    </Box>

  );
}
