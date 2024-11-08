import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// components
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// contexts
import { useJobContext } from 'src/context/job/hooks/usejobContext';
// _mock
import { ROLES, JOB_BENEFIT_OPTIONS, JOB_EXPERIENCE_OPTIONS , JOB_LOCATION} from 'src/_mock';
//

import { useAuthContext } from 'src/auth/hooks';
import JobList from '../job-list';
import JobSearch from '../job-search';
import JobFilters from '../job-filters';
import JobFiltersResult from '../job-filters-result';
import JobCreateForm from '../job-create-form';

// ----------------------------------------------------------------------

const defaultFilters = {
  roles: [],
  locations: [],
  benefits: [],
  experience: '',
};

// ----------------------------------------------------------------------

export default function JobListView(rowAdd) {
  const { permissions } = useAuthContext();
  const { jobs,  getJobAction } = useJobContext();

  const settings = useSettingsContext();

  const canCreateJob = permissions.includes('create_jobOffers');

  const openFilters = useBoolean();

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  useEffect(() => {
    getJobAction();
  }, [getJobAction]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: jobs,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = jobs.filter(
          (job) => job.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query, jobs]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <JobSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id) => paths.dashboard.students_job.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <JobFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          locationOptions={JOB_LOCATION}
          roleOptions={ROLES}
          benefitOptions={JOB_BENEFIT_OPTIONS.map((option) => option.label)}
          experienceOptions={JOB_EXPERIENCE_OPTIONS.map((option) => option.label)}
        />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <JobFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  const CreateJob = useBoolean();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Ofertas laborales"
        links={[
          { name: 'Inicio', href: paths.dashboard.root },
          {
            name: 'Ofertas',
            href: paths.dashboard.students_job.root,
          },
          { name: 'Lista' },
        ]}
        action={
          canCreateJob && (
            <Button
              component={RouterLink}
              onClick={CreateJob.onTrue}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nueva Oferta
            </Button>
          )
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobCreateForm currentJob={rowAdd} open={CreateJob.value} onClose={CreateJob.onFalse} />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled title="No hay información" sx={{ py: 10 }} />}

      <JobList jobs={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters }) => {
  const { experience, roles, locations, benefits } = filters;

  if (experience.length) {
    inputData = inputData.filter((job) => job.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.roleJob));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => locations.includes(job.location));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => benefits.includes(job.benefits));
  }

  return inputData;
};
