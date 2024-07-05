import PropTypes from 'prop-types';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// _mock
import { _addressBooks } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import FormProvider from 'src/components/hook-form';

import AccountAddStudies from './components/account-add-studies';

export default function AccountStudies({ currentStudies }) {


  const NewStudiesSchema = Yup.object().shape({
    title: Yup.string().required('El titulo es requerido'),
    createDate: Yup.mixed().nullable().required('Create date is required'),
    dueDate: Yup.mixed()
      .required('Due date is required')
      .test(
        'date-min',
        'Due date must be later than create date',
        (value, { parent }) => value.getTime() > parent.createDate.getTime()
      ),
    // not require
  });

  const defaultValues = useMemo(
    () => ({
      title: currentStudies?.title || '',
      createDate: currentStudies?.createDate || new Date(),
      dueDate: currentStudies?.dueDate || null,

      studies: currentStudies?.studies || [
        {
          title: '',
        },
      ],
    }),
    [currentStudies]
  );


  const methods = useForm({
    resolver: yupResolver(NewStudiesSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <AccountAddStudies />
        </Stack>
      </Card>
    </FormProvider>
  );
}

AccountStudies.propTypes = {
  currentStudies: PropTypes.object,
};

