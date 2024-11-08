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
import { useAuthContext } from 'src/auth/hooks';
import { CvProvider } from 'src/context/cv/context/cvProvider';
import { ApplyJobsProvider } from 'src/context/apply-jobs/context/applyJobsProvider';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/profile/index'));
// const PageCourses = lazy(() => import('src/pages/dashboard/cursos'));
// const PageFavorite = lazy(() => import('src/pages/dashboard/favorite/list'));
const PageApplication = lazy(() => import('src/pages/dashboard/application/list'));
const PageUsers = lazy(() => import('src/pages/dashboard/user/list'));
const PageRoles = lazy(() => import('src/pages/dashboard/roles/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const PageStudentsJob = lazy(() => import('src/pages/dashboard/job/list'));
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));

// ----------------------------------------------------------------------

function ConditionalIndexPage() {
  const { user } = useAuthContext(); // asumimos que `role` está disponible en el contexto del usuario

  const role = user ? user.role.name : '';

  if (role.toLowerCase() === 'estudiante') {
    return (
      <RoleBasedGuard permissions={['read_employment_profile']}>
        <IndexPage />
      </RoleBasedGuard>
    );
  }

  if (role.toLowerCase() === 'funcionario' || role.toLowerCase() === 'super administrador') {
    return (
      <RoleBasedGuard permissions={['read_jobOffers']}>
        <PageStudentsJob />
      </RoleBasedGuard>
    );
  }
  return null; // o una página de error si el rol no es válido
}

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <UserProvider>
          <CvProvider>
            <RoleProvider>
              <JobProvider>
                <ApplyJobsProvider>
                  <DashboardLayout>
                    <Suspense fallback={<LoadingScreen />}>
                      <Outlet />
                    </Suspense>
                  </DashboardLayout>
                </ApplyJobsProvider>
              </JobProvider>
            </RoleProvider>
          </CvProvider>
        </UserProvider>
      </AuthGuard>
    ),
    children: [
      {
        element: <ConditionalIndexPage />,
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
