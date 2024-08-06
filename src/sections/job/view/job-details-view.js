import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { LoadingScreen } from 'src/components/loading-screen';
// contexts
import { useJobContext } from 'src/context/job/hooks/usejobContext';
import { useSettingsContext } from 'src/components/settings';
//
import JobDetailsToolbar from '../job-details-toolbar';
import JobDetailsContent from '../job-details-content';
import JobDetailsCandidates from '../job-details-candidates';


// ----------------------------------------------------------------------

export default function JobDetailsView({ id }) {
  const { loadingDetail, jobSelected, getJobByIdAction  } = useJobContext();

  useEffect(() => { getJobByIdAction(id) }, [getJobByIdAction, id]);

  const settings = useSettingsContext();

  // const [publish, setPublish] = useState(jobSelected?.publish);

  const [currentTab, setCurrentTab] = useState('content');


  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  // const handleChangePublish = useCallback((newValue) => {
  //   setPublish(newValue);
  // }, []);

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
              <Label variant="filled">{jobSelected?.candidates.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))} */}
    </Tabs>
  );

  return (
    loadingDetail ? <LoadingScreen/> :
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobDetailsToolbar
        backLink={paths.dashboard.students_job.job}
        // editLink={paths.dashboard.job.edit(`${jobSelected?.id}`)}
        liveLink="#"
        // publish={publish || ''}
        // onChangePublish={handleChangePublish}
        // publishOptions={JOB_PUBLISH_OPTIONS}
      />
      {renderTabs}

      {currentTab === 'content' && <JobDetailsContent job={jobSelected} />}

      {currentTab === 'candidates' && <JobDetailsCandidates candidates={jobSelected?.candidates} />}
    </Container>
  );
}

JobDetailsView.propTypes = {
  id: PropTypes.number,
};
