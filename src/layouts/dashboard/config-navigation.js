import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
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
  const data = useMemo(
    () => [
      // CUC UNIVERSIRY
      // ----------------------------------------------------------------------
      {
        subheader: 'Portal CUC v1.0.0',
        items: [
          { title: 'Perfil empleo', path: paths.dashboard.root, icon: ICONS.user },
          { title: 'Aplicaciones', path: paths.dashboard.application, icon: ICONS.application },
          { title: 'Mis favoritos', path: paths.dashboard.favorite, icon: ICONS.favorite },
          { title: 'Cursos', path: paths.dashboard.courses, icon: ICONS.book },
          // { title: 'Inicio', path: paths.dashboard.root, icon: ICONS.home },
        ],
      },

      // STUDENTS
      // ----------------------------------------------------------------------
      {
        subheader: 'Ofertas de empleo',
        items: [
          {
            title: 'Buscar empleo',
            path: paths.dashboard.students_job.root,
            icon: ICONS.search,
            children: [
              { title: 'ofertas', path: paths.dashboard.students_job.job },
            ],
          },
        ],

      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'Administrador de cuentas',
        items: [
          {
            title: 'Administrador',
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [
              { title: 'usuarios', path: paths.dashboard.user.root },
              { title: 'roles', path: paths.dashboard.user.roles },
            ],
          },
        ],
      },
    ],
    []
  );

  return data;
}
