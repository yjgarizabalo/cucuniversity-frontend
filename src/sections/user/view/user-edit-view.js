import { useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// context
import { useUserContext } from 'src/context/user/hooks/userUserContext';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import UserEditForm from '../user-edit';


// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const { users, addUserAccion } = useUserContext()

  const settings = useSettingsContext();

  useEffect(() => {
    addUserAccion()
  }, [addUserAccion])

  const currentUser = users.find((user) => user.id === id);
  console.log(currentUser)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Editar Usuario"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Usuario',
            href: paths.dashboard.user.root,
          },
          { name: currentUser?.firstName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserEditForm currentUser={currentUser} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
