import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------


const IndexPage = lazy(() => import('src/pages/dashboard/profile/index'));
const PageCourses = lazy(() => import('src/pages/dashboard/cursos'));
const PageStudentsJob = lazy(() => import('src/pages/dashboard/job/list'));
const PageFavorite = lazy(() => import('src/pages/dashboard/favorite/list'));
const PageApplication = lazy(() => import('src/pages/dashboard/application/list'));
const PageUsers = lazy(() => import('src/pages/dashboard/user/list'));
const PageRoles = lazy(() => import('src/pages/dashboard/roles/list'));
// const IndexPage = lazy(() => import('src/pages/dashboard/home'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'application', element: <PageApplication /> },
      { path: 'favorite', element: <PageFavorite /> },
      { path: 'courses', element: <PageCourses /> },
      
      {
        path: 'students_job',
        children: [
          { element: <PageStudentsJob />, index: true },
          { path: 'job', element: <PageStudentsJob /> },
        ],
      },

      {
        path: 'user',
        children: [
          { element: <PageUsers />, index: true },
          { path: 'roles', element: <PageRoles /> },
        ],
      },
    ],
  },
];
