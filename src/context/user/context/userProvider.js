import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useActiveLink } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';
import reducer from './userRedurcer';
import { initialState } from '../initalState';
import { UserContext } from './userContetxt';
import { useUsersApi } from '../hooks/useUserApi';
import { useUserDispatch  } from '../hooks/useUserDispatch';


// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isUserListViewActive = useActiveLink(paths.dashboard.user.list);
  const { handleErrorMessageNotickBar } = useHandleResponseMessage();
  const { fetchUsers, fetchUserById, addUser, updateUser, deleteUser } = useUsersApi();
  const {
    loadingAction,
    errorAction,
    getUserSuccess,
    getUserByIdSuccess,
    addUserSuccess,
    editUserSuccess,
    deleteUserSuccess,
  } = useUserDispatch();

  useEffect(() => {
    if (!isUserListViewActive) {
      loadingAction(dispatch);
    }
  }, [isUserListViewActive, loadingAction]);

  const getUserAccion = useCallback(async () => {
    loadingAction(dispatch);
    try {
      const users = await fetchUsers();
      getUserSuccess(dispatch, users);
    } catch (error) {
      console.error('se a presentado un error', error);
      errorAction(dispatch);
      handleErrorMessageNotickBar(error);
    }
  }, [loadingAction, errorAction, handleErrorMessageNotickBar, fetchUsers, getUserSuccess]);

  const getUserByIdAccion = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const user = await fetchUserById(id);
        getUserByIdSuccess(dispatch, user);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, getUserByIdSuccess, errorAction, handleErrorMessageNotickBar, fetchUserById]
  );

  const addUserAccion = useCallback(
    async (user) => {
      try {
        const newUser = await addUser(user);
        addUserSuccess(dispatch, newUser);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error);
        throw error;
      }
    },
    [addUserSuccess, handleErrorMessageNotickBar, addUser]
  );

  const editUser = useCallback(
    async (user) => {
      try {
        const userUpdate = await updateUser(user);
        editUserSuccess(dispatch, userUpdate);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error, 'usuario no encontrado');
        throw error;
      }
    },
    [editUserSuccess, handleErrorMessageNotickBar, updateUser]
  );

  const deleteUserAccion = useCallback(
    async (id) => {
      try {
        await deleteUser(id);
        deleteUserSuccess(dispatch, id);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error);
        throw error;
      }
    },
    [deleteUserSuccess, handleErrorMessageNotickBar, deleteUser]
  );


  const memorizedState = useMemo(
    () => ({
      users: state.users,
      userSelected: state.userSelected,
      loading: state.loading,
      error: state.error,
      getUserAccion,
      getUserByIdAccion,
      addUserAccion,
      editUser,
      deleteUserAccion,
    }),
    [
      getUserAccion,
      getUserByIdAccion,
      addUserAccion,
      editUser,
      deleteUserAccion,
      state.users,
      state.userSelected,
      state.loading,
      state.error,
    ]
  );

  return <UserContext.Provider value={memorizedState}>{children}</UserContext.Provider>;
};
