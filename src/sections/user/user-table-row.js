import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

// context
import { useRoleContext } from 'src/context/role/hooks/useRoleContext';
import { useAuthContext } from 'src/auth/hooks';

// vistas
import UserEditForm from './user-edit-form';
import UserPasswordEditForm from './user-password-edit-form';


export default function UserTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const { permissions } = useAuthContext();
  const { firstName, secondName, lastName, secondSurname, program, email, identification, role: { name } } = row;
  const { roles } = useRoleContext();

  const confirm = useBoolean();
  const confirmPassword = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();

  const canUpdateUsers = permissions.includes('update_users');
  const canDeleteUsers = permissions.includes('delete_users');


  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            // eslint-disable-next-line no-unneeded-ternary
            primary={`${firstName} ${secondName ? secondName : ''} ${lastName} ${secondSurname || ''}`}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{identification}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{program}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>




        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {canUpdateUsers && (
            <Tooltip title="Editar usuario" placement="top" arrow>
              <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
          )}

          {canUpdateUsers && (
            <Tooltip title="Cambiar contraseña" placement="top" arrow>
              <IconButton color={confirmPassword.value ? 'inherit' : 'default'} onClick={confirmPassword.onTrue}>
                <Iconify icon="mdi:password-reset" />
              </IconButton>
            </Tooltip>
          )}

          {canDeleteUsers && (
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {canUpdateUsers && (
        <UserEditForm currentUser={row} currentRoles={roles} open={quickEdit.value} onClose={quickEdit.onFalse} />
      )}

      {canUpdateUsers && (
        <UserPasswordEditForm currentUser={row} open={confirmPassword.value} onClose={confirmPassword.onFalse} />
      )}

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
        {canDeleteUsers && (
          <MenuItem onClick={() => { confirm.onTrue(); popover.onClose(); }} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Eliminar
          </MenuItem>
        )}
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Eliminar usuario"
        content="¿Estás seguro de que quieres eliminar este usuario?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Eliminar
          </Button>
        }
      />


    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
