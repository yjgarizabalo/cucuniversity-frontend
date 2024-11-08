import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  home: icon('ic_home'),
  book: icon('ic_book'),
  search: icon('ic_search'),
  application: icon('ic_arrow_map'),
  favorite: icon('ic_favorite'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { permissions } = useAuthContext();

  const data = useMemo(() => {
    const navItems = [
      // CUC UNIVERSITY
      {
        subheader: 'Portal CUC v1.0.0',
        items: [
          {
            title: 'Perfil empleo',
            path: paths.dashboard.root,
            icon: ICONS.user,
            requiredPermission: 'read_employment_profile',
          },
          // {
          //   title: 'Aplicaciones',
          //   path: paths.dashboard.application,
          //   icon: ICONS.application,
          //   requiredPermission: 'read_jobApplications',
          // },
        ],
      },

      // STUDENTS
      {
        subheader: 'Ofertas de empleo',
        items: [
          {
            title: 'Buscar empleo',
            path: paths.dashboard.students_job.root,
            icon: ICONS.search,
            requiredPermission: 'read_jobOffers',
            children: [
              { title: 'ofertas', path: paths.dashboard.students_job.job, requiredPermission: 'read_jobOffers' },
            ],
          },
        ],
      },

      // MANAGEMENT
      {
        subheader: 'Administrador de cuentas',
        items: [
          {
            title: 'Administrador',
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            requiredPermission: 'read_admModule',
            children: [
              { title: 'usuarios', path: paths.dashboard.user.root, requiredPermission: 'read_users' },
              { title: 'roles', path: paths.dashboard.user.roles, requiredPermission: 'read_roles' },
            ],
          },
        ],
      },
    ];

    // Filtra las secciones y elementos basándose en los permisos del usuario
    const filteredNavItems = navItems.map((section) => {
      const filteredItems = section.items
        .filter((item) => permissions.includes(item.requiredPermission))
        .map((item) => ({
          ...item,
          // Si el elemento tiene hijos, filtramos también los hijos
          children: item.children
            ? item.children.filter((child) => permissions.includes(child.requiredPermission))
            : undefined, // Si no hay hijos, usamos undefined para mantener la estructura
        }));

      // Solo incluimos las secciones con elementos visibles
      return filteredItems.length > 0
        ? { ...section, items: filteredItems }
        : null;
    }).filter(Boolean); // Filtramos las secciones nulas

    return filteredNavItems;
  }, [permissions]);

  return data;
}
