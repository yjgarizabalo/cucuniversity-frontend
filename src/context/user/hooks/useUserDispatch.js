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

  const getUserSuccess = useCallback((dispatch, users) => {
    dispatch({
      type: Payload.GET_USERS,
      payload: users,
    });
  }, []);

  const getUserByIdSuccess = useCallback((dispatch, user) => {
    dispatch({
      type: Payload.GET_USER,
      payload: user
    });
  }, []);

  const addUserSuccess = useCallback((dispatch, user) => {
    dispatch({
      type: Payload.ADD_USER,
      payload: user
    });
  }, []);

  const editUserSuccess = useCallback((dispatch, user) => {
    dispatch({
      type: Payload.EDIT_USER,
      payload: user
    });
  }, []);

  const deleteUserSuccess = useCallback((dispatch, id) => {
    dispatch({
      type: Payload.DELETE_USER,
      payload: id
    });
  }, []);

  const multiDeleteUserSucces = useCallback((dispatch, ids) => {
    dispatch({
      type: Payload.DELETES_USER,
      payload: ids
    });
  }, []);

  return {
    loadingAction,
    errorAction,
    getUserSuccess,
    getUserByIdSuccess,
    addUserSuccess,
    editUserSuccess,
    deleteUserSuccess,
    multiDeleteUserSucces,
  };

};
