import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useActiveLink } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';
import reducer from './roleReducer'
import { initialState } from '../initalState';
import { RoleContext } from './roleContext';
import { useRoleApi } from '../hooks/useRoleApi';
import { useRoleDispatch } from '../hooks/useRoleDispatch';


// eslint-disable-next-line react/prop-types
export const RoleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isRoleListViewActive = useActiveLink(paths.dashboard.user.roles);
  const { handleErrorMessageNotickBar } = useHandleResponseMessage();
  const { fetchRoles, fetchRoleById, addRole, updateRole, deleteRole, multiDeleteRole } = useRoleApi();
  const {
    loadingAction,
    errorAction,
    getRoles,
    getRoleByIdSuccess,
    addRoleSuccess,
    editRoleSuccess,
    deleteRoleSuccess,
  } = useRoleDispatch();


  useEffect(() => {
    if (!isRoleListViewActive) {
      loadingAction(dispatch);
    }
  }, [isRoleListViewActive, loadingAction]);

  const getRoleAction = useCallback(async () => {
    loadingAction(dispatch);
    try {
      const roles = await fetchRoles();
      getRoles(dispatch, roles);
    } catch (error) {
      console.error('se a presentado un error', error);
      errorAction(dispatch);
      handleErrorMessageNotickBar(error);
    }
  }, [loadingAction, errorAction, handleErrorMessageNotickBar, fetchRoles, getRoles]);

  const getRoleByIdAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const role = await fetchRoleById(id);
        getRoleByIdSuccess(dispatch, role);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, getRoleByIdSuccess, errorAction, handleErrorMessageNotickBar, fetchRoleById]
  );

  const addRoleAction = useCallback(
    async (role) => {
      try {
        const roleAdded = await addRole(role);
        addRoleSuccess(dispatch, roleAdded);
      } catch (error)  {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error);
        throw error;
      }
    },
    [addRoleSuccess, handleErrorMessageNotickBar, addRole]
  );

  const editRoleAction = useCallback(
    async (role) => {
      console.log(role);
      try {
        const roleUpdated = await updateRole(role);
        editRoleSuccess(dispatch, roleUpdated);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error);
        throw error;
      }
    },
    [editRoleSuccess, handleErrorMessageNotickBar, updateRole]
  );

  const deleteRoleAction = useCallback(
    async (id) => {
      try {
        await deleteRole(id);
        deleteRoleSuccess(dispatch, id);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error);
        throw error;
      }
    },
    [deleteRoleSuccess, handleErrorMessageNotickBar, deleteRole]
  );


  const memorizedState = useMemo(
    () => ({
      roles: state.roles,
      roleSelected: state.roleSelected,
      loading: state.loading,
      error: state.error,
      getRoleAction,
      getRoleByIdAction,
      addRoleAction,
      editRoleAction,
      deleteRoleAction,
      multiDeleteRole,
    }),

    [
      state.roles,
      state.roleSelected,
      state.loading,
      state.error,
      //
      getRoleAction,
      getRoleByIdAction,
      addRoleAction,
      editRoleAction,
      deleteRoleAction,
      multiDeleteRole,
    ]
  );
  return <RoleContext.Provider value={memorizedState}>{children}</RoleContext.Provider>;
};
