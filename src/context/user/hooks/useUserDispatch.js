import { useCallback } from "react";
import { Payload } from '../context/userRedurcer';

export const useUserDispatch = () => {
  const loadingAction = useCallback((dispatch) => {
    dispatch({
      type: Payload.LOADING_ACTION,
      payload: {
        loading: true,
      },
    });
  }, []);

  const errorAction = useCallback((dispatch, error) => {
    dispatch({
      type: Payload.ERROR_ACTION,
      payload: {
        error,
      },
    });

    setTimeout(() => {
      dispatch({
        type: Payload.ERROR_ACTION,
        payload: {
          error: false,
        },
      });
    }, 4000);
  }, []);

  const getUsers = useCallback((dispatch, users) => {
    dispatch({
      type: Payload.GET_USERS,
      payload: {
        users,
      },
    });
  }, []);

  const getUser = useCallback((dispatch, user) => {
    dispatch({
      type: Payload.GET_USER,
      payload: {
        user,
      },
    });
  }, []);

  const addUser = useCallback((dispatch, user) => {
    dispatch({
      type: Payload.ADD_USER,
      payload: {
        user,
      },
    });
  }, []);

  const editUser = useCallback((dispatch, user) => {
    dispatch({
      type: Payload.EDIT_USER,
      payload: {
        user,
      },
    });
  }, []);

  const deleteUser = useCallback((dispatch, id) => {
    dispatch({
      type: Payload.DELETE_USER,
      payload: {
        id,
      },
    });
  }, []);

  const multiDeleteUser = useCallback((dispatch, ids) => {
    dispatch({
      type: Payload.DELETES_USER,
      payload: {
        ids,
      },
    });
  }, []);

  return {
    loadingAction,
    errorAction,
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
    multiDeleteUser,
  };

};
