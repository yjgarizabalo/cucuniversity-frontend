import { useCallback } from 'react';
import { useSnackbar } from 'src/components/snackbar';

export const useHandleResponseMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleResponseMessage = useCallback(
    (response, customSuccessMessage) => {
      if (customSuccessMessage) {
        enqueueSnackbar(customSuccessMessage);
      } else if (response && response.msg) {
        enqueueSnackbar(response.msg);
      } else if (response && response.message) {
        enqueueSnackbar(response.message);
      }
    },
    [enqueueSnackbar]
  );

  const handleErrorMessageNotickBar = useCallback(
    (error, customErrorMessage) => {
      if (customErrorMessage) {
        enqueueSnackbar(customErrorMessage, {
          variant: 'error',
        });
      } else if (typeof error === 'string') {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      } else if (Array.isArray(error.msg) && error.msg[0] && error.msg[0].message) {
        enqueueSnackbar(error.msg[0].message, {
          variant: 'error',
        });
      } else if (typeof error === 'object' && error.msg) {
        enqueueSnackbar(error.msg, {
          variant: 'error',
        });
      } else if (error.message) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Operation error', {
          variant: 'error',
        });
      }
    },
    [enqueueSnackbar]
  );

  const handleErrorMessage = useCallback(
    (error, customErrorMessage) => {
      let errorMessage;
      if (customErrorMessage) {
        errorMessage = customErrorMessage;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (Array.isArray(error.msg) && error.msg[0] && error.msg[0].message) {
        errorMessage = error.msg[0].message ;
      } else if (typeof error === 'object' && error.msg) {
        errorMessage = error.msg;
      } else if (typeof error === 'object' && error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Operation error";
      }

      return errorMessage;
    },
    []
  );

  return {
    handleResponseMessage,
    handleErrorMessageNotickBar,
    handleErrorMessage,
  };
};
