import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import { UserProvider } from 'src/context/user/context/userProvider';
import { RoleProvider } from 'src/context/role/context/roleProvider';
import { JobProvider } from 'src/context/job/context/jobProvider';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/profile/index'));
const PageCourses = lazy(() => import('src/pages/dashboard/cursos'));
const PageFavorite = lazy(() => import('src/pages/dashboard/favorite/list'));
const PageApplication = lazy(() => import('src/pages/dashboard/application/list'));
const PageUsers = lazy(() => import('src/pages/dashboard/user/list'));
const PageRoles = lazy(() => import('src/pages/dashboard/roles/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const PageStudentsJob = lazy(() => import('src/pages/dashboard/job/list'));
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <UserProvider>
          <RoleProvider>
            <JobProvider>
              <DashboardLayout>
                <Suspense fallback={<LoadingScreen />}>
                  <Outlet />
                </Suspense>
              </DashboardLayout>
            </JobProvider>
          </RoleProvider>
        </UserProvider>
      </AuthGuard>
    ),
    children: [
      {
        element: (
          <RoleBasedGuard permissions={['read_employment_profile']}>
            <IndexPage />
          </RoleBasedGuard>
        ),
        index: true,
      },
      {
        path: 'application',
        element: (
          <RoleBasedGuard permissions={['read_jobApplications']}>
            <PageApplication />
          </RoleBasedGuard>
        ),
      },
      // { path: 'favorite', element: <PageFavorite /> },
      // { path: 'courses', element: <PageCourses /> },

      {
        path: 'students_job',
        children: [
          {
            element: (
              <RoleBasedGuard permissions={['read_jobOffers']}>
                <PageStudentsJob />
              </RoleBasedGuard>
            ),
            index: true,
          },
          {
            path: 'job',
            element: (
              <RoleBasedGuard permissions={['read_jobOffers']}>
                <PageStudentsJob />
              </RoleBasedGuard>
            ),
          },
          {
            path: ':id',
            element: (
              <RoleBasedGuard permissions={['read_jobOffers']}>
                <JobDetailsPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },

      {
        path: 'user',
        children: [
          {
            element: (
              <RoleBasedGuard permissions={['read_users']}>
                <PageUsers />
              </RoleBasedGuard>
            ),
            index: true,
          },
          {
            path: 'roles',
            element: (
              <RoleBasedGuard permissions={['read_roles']}>
                <PageRoles />
              </RoleBasedGuard>
            ),
          },
          {
            path: 'account',
            element: (
              <RoleBasedGuard permissions={['read_employment_profile']}>
                <UserAccountPage />
              </RoleBasedGuard>
            ),
          },
        ],
      },
    ],
  },
];
