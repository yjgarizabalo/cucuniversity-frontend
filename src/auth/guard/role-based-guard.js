import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent, permissions, children, sx }) {
  const { permissions: userPermissions } = useAuthContext();

  // Verificar si el usuario tiene todos los permisos requeridos
  const hasPermission = permissions.every((perm) => userPermissions.includes(perm));

  if (!hasPermission) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permiso Denegado
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            No tienes permiso para acceder a esta página
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  permissions: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.object,
};

// Establece hasContent en true por defecto
RoleBasedGuard.defaultProps = {
  hasContent: true,
};

