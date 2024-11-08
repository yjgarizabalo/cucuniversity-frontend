import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
// context
import { useUserContext } from 'src/context/user/hooks/userUserContext';
import { useRoleContext } from 'src/context/role/hooks/useRoleContext';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import UserCreateForm from '../user-create-form';
import UserTableFiltersResult from '../user-table-filters-result';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre' },
  { id: 'identification', label: 'Identifiación', width: 180 },
  { id: 'company', label: 'Programa', width: 220 },
  { id: 'role', label: 'Rol', width: 180 },
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
};

// ----------------------------------------------------------------------

export default function UserListView(rowAdd) {
  const { permissions } = useAuthContext();
  const { users, getUserAction, deleteUserAction } = useUserContext();
  const { roles, getRoleAction } = useRoleContext();

  const canCreateUser = permissions.includes('create_users');

  const table = useTable();

  const { enqueueSnackbar } = useSnackbar();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    getUserAction();
    getRoleAction();
  }, [getUserAction, getRoleAction]);

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      enqueueSnackbar('Usuario Eliminado', 'success');
      deleteUserAction(id);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, enqueueSnackbar, deleteUserAction]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = users.filter((row) => !table.selected.includes(row.id));
    // setTableData(deleteRows); // funcion que usaremos

    table.onUpdatePageDeleteRows({
      totalRows: users.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, users]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  // const handleFilterStatus = useCallback(
  //   (event, newValue) => {
  //     handleFilters('status', newValue);
  //   },
  //   [handleFilters]
  // );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const createUser = useBoolean();

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Usuarios "
          links={[
            { name: 'Inicio', href: paths.dashboard.root },
            { name: 'Usuarios', href: paths.dashboard.user.root },
            { name: 'Lista' },
          ]}
          action={
            canCreateUser && (
              <Button
                component={RouterLink}
                onClick={createUser.onTrue}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Nuevo usuario
              </Button>
            )
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        {canCreateUser && (
          <UserCreateForm
            currentRoles={roles}
            currentUser={rowAdd}
            open={createUser.value}
            onClose={createUser.onFalse}
          />
        )}

        <Card>
          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={roles.map((role) => role.name)}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={users.filter((user) => user.status !== false).length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  users.filter((user) => user.status !== false).map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.filter((user) => user.status !== false).length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      users.filter((user) => user.status !== false).map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Eliminar usuario"
        content={
          <>
            Estas seguro de eliminar a <strong> {table.selected.length} </strong> ?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((user) => {
      // Construir nombre completo del usuario, omitiendo cualquier campo opcional que esté vacío
      const fullName = [user.firstName, user.secondName, user.lastName, user.secondSurname]
        .filter(Boolean)
        .join(' ');

      // Comprobar si el texto ingresado coincide con el nombre completo o la identificación
      return (
        fullName.toLowerCase().includes(name.toLowerCase()) ||
        (user.identification && user.identification.toLowerCase().includes(name.toLowerCase()))
      );
    });
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role.name));
  }

  return inputData;
}
