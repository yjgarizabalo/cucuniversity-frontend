import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// contexts
import { useJobContext } from 'src/context/job/hooks/usejobContext';
// _mock
import { JOB_DETAILS_TABS } from 'src/_mock';
// components
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
//
import JobDetailsToolbar from '../job-details-toolbar';
import JobDetailsContent from '../job-details-content';
import JobDetailsCandidates from '../job-details-candidates';

// ----------------------------------------------------------------------

export default function JobDetailsView({ id }) {
  const { jobs, getJobAction } = useJobContext();

  const settings = useSettingsContext();

  console.log(jobs, "jobs");
  useEffect(() => { getJobAction() }, [getJobAction]);

  const currentJob = jobs.find((job) => job.id === id);
  console.log(currentJob, "currentJob");

  const [publish, setPublish] = useState(currentJob?.publish);

  const [currentTab, setCurrentTab] = useState('content');


  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {/* {JOB_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'candidates' ? (
              <Label variant="filled">{currentJob?.candidates.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))} */}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobDetailsToolbar
        backLink={paths.dashboard.students_job.job}
        // editLink={paths.dashboard.job.edit(`${currentJob?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        // publishOptions={JOB_PUBLISH_OPTIONS}
      />
      {renderTabs}

      {currentTab === 'content' && <JobDetailsContent job={currentJob} />}

      {currentTab === 'candidates' && <JobDetailsCandidates candidates={currentJob?.candidates} />}
    </Container>
  );
}

JobDetailsView.propTypes = {
  id: PropTypes.number,
};
