import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
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
      { element: <IndexPage />, index: true },
      { path: 'application', element: <PageApplication /> },
      // { path: 'favorite', element: <PageFavorite /> },
      // { path: 'courses', element: <PageCourses /> },

      {
        path: 'students_job',
        children: [
          { element: <PageStudentsJob />, index: true },
          { path: 'job', element: <PageStudentsJob /> },
          { path: ':id', element: <JobDetailsPage /> }
        ],
      },

      {
        path: 'user',
        children: [
          { element: <PageUsers />, index: true },
          { path: 'roles', element: <PageRoles /> },
          { path: 'account', element: <UserAccountPage /> }
        ],
      },
    ],
  },
];
