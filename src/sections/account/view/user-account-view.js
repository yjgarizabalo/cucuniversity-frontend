import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import {  } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import AccountGeneral from '../account-general';
import AccountStudies from '../account-studies';
import AccountExperience from '../account-exp';
import AccountCv from '../account-cv';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'general',
    label: 'General',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'studies',
    label: 'Estudios',
    icon: <Iconify icon="solar:book-2-bold" width={24} />,
  },
  {
    value: 'experience',
    label: 'Experiencia',
    icon: <Iconify icon="carbon:skill-level-basic" width={24} />,
  },

  {
    value: 'cv',
    label: 'Adjuntar CV',
    icon: <Iconify icon="solar:file-text-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Hoja de vida"
        links={[
          { name: 'Inicio', href: paths.dashboard.root },
          { name: 'Mi area', href: paths.dashboard.user.root },
          { name: 'Hoja de vida' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'general' && <AccountGeneral />}

      {currentTab === 'studies' && <AccountStudies/>}

      {currentTab === 'experience' && <AccountExperience />}

      {currentTab === 'cv' && <AccountCv />}
    </Container>
  );
}
