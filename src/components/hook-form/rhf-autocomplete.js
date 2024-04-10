import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function RHFAutocomplete({
  // eslint-disable-next-line react/prop-types
  name,
  // eslint-disable-next-line react/prop-types
  label,
    // eslint-disable-next-line react/prop-types
  placeholder,
    // eslint-disable-next-line react/prop-types
  helperText,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

export default RHFAutocomplete;
