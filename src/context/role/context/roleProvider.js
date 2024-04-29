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

  const getRoleAccion = useCallback(async () => {
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

  const getRoleByIdAccion = useCallback(
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

  const addRoleAccion = useCallback(
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

  const editRoleAccion = useCallback(
    async (role) => {
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


  const memorizedState = useMemo(
    () => ({
      roles: state.roles,
      roleSelected: state.roleSelected,
      loading: state.loading,
      error: state.error,
      getRoleAccion,
      getRoleByIdAccion,
      addRoleAccion,
      editRoleAccion,
      deleteRole,
      multiDeleteRole,
    }),

    [
      state.roles,
      state.roleSelected,
      state.loading,
      state.error,
      //
      getRoleAccion,
      getRoleByIdAccion,
      addRoleAccion,
      editRoleAccion,
      deleteRole,
      multiDeleteRole,
    ]
  );
  return <RoleContext.Provider value={memorizedState}>{children}</RoleContext.Provider>;
};
