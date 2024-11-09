import { useState, useCallback,useEffect } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _userAbout, _userFeeds, _userAplications } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// context
import { useAuthContext } from 'src/auth/hooks';
import { useCvContext } from 'src/context/cv/hooks/useCvContext'
import { LoadingScreen } from 'src/components/loading-screen';
// import ProfileFavorite from '../profile-favorite';

// views
import AccountView from 'src/sections/account/view/user-account-view';
import ProfileAplications from '../profile-aplications';
import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Mi area',
    icon: <Iconify icon="solar:home-2-bold" width={24} />,
  },
  {
    value: 'aplications',
    label: 'Aplicaciones',
    icon: <Iconify icon="solar:map-arrow-square-bold" width={24} />,
  },
  {
    value: 'cv',
    label: 'Hoja de vida',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const settings = useSettingsContext();

  const { user: authUser, loading } = useAuthContext();
  const { userCV, getCvByUserIdAction  } = useCvContext();

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      getCvByUserIdAction(authUser.id);
    }
  }, [authUser?.id, getCvByUserIdAction]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Mi área"
            links={[
              { name: 'Inicio', href: paths.dashboard.root },
              { name: 'Mi área', href: paths.dashboard.root },
              {
                name: authUser
                  ? `${authUser.firstName} ${authUser.secondName} ${authUser.lastName} ${authUser.secondSurname}`
                  : 'Invitado',
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <Card sx={{ mb: 3, height: 250 }}>
            <ProfileCover
              role={authUser ? authUser.program : ''}
              name={authUser ? `${authUser.firstName} ${authUser?.secondName} ${authUser?.lastName} ${authUser?.secondSurname}` : 'invitado'}
              avatarUrl={userCV?.avatar}
              coverUrl={_userAbout.coverUrl}
              coverProfileUrl={_userAbout.coverProfileUrl}
            />

            <Tabs
              value={currentTab}
              onChange={handleChangeTab}
              sx={{
                width: 1,
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
                bgcolor: 'background.paper',
                [`& .${tabsClasses.flexContainer}`]: {
                  pr: { md: 3 },
                  justifyContent: {
                    sm: 'center',
                    md: 'flex-end',
                  },
                },
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>
          </Card>

          {currentTab === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />}

          {currentTab === 'aplications' && <ProfileAplications aplications={_userAplications} />}

          {currentTab === 'cv' && <AccountView />}
        </Container>
      )}
    </>
  );
}
