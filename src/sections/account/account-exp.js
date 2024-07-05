import PropTypes from 'prop-types';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// components
import FormProvider from 'src/components/hook-form';
import AccountAddExperincies from './components/account-add-exp'

export default function AccountExperience({ currentExperience }) {

  const NewExperinceSchema = Yup.object().shape({
    role: Yup.string().required('El titulo es requerido'),
  })



  const defaultValues = useMemo(
    () => ({
      role: currentExperience?.role || '',
      startDate: currentExperience?.startDate || new Date(),
      endDate: currentExperience?.endDate || null,

      yearsExperience: currentExperience?.yearsExperience || [
        {
          title: '',
        },
      ],
    }),
    [currentExperience]
  );

  const methods = useForm({
    resolver: yupResolver(NewExperinceSchema),
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
          <AccountAddExperincies />
        </Stack>
      </Card>
    </FormProvider>
  )

}

AccountExperience.propTypes = {
  currentExperience: PropTypes.object,
}
