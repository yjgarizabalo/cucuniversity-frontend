import { useCallback } from "react";
import { Payload } from '../context/roleReducer';

export const useRoleDispatch = () => {
  const loadingAction = useCallback((dispatch) => {
    dispatch({
      type: Payload.LOGIN_ACTION,
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

  const getRoles = useCallback((dispatch, roles) => {
    dispatch({
      type: Payload.GET_ROLES,
      payload: roles
    });
  }, []);

  const getRoleByIdSuccess = useCallback((dispatch, role) => {
    dispatch({
      type: Payload.GET_ROLE,
      payload: role
    });
  }, []);

  const addRoleSuccess = useCallback((dispatch, role) => {
    dispatch({
      type: Payload.ADD_ROLE,
      payload:  role
    });
  }, []);

  const editRoleSuccess = useCallback((dispatch, role) => {
    dispatch({
      type: Payload.EDIT_ROLE,
      payload:  role
    });
  }, []);

  const deleteRoleSuccess = useCallback((dispatch, id) => {
    dispatch({
      type: Payload.DELETE_ROLE,
      payload: id
    });
  }, []);

  const deletesRoleSucces = useCallback((dispatch, ids) => {
    dispatch({
      type: Payload.DELETES_ROLE,
      payload: ids
    });
  }, []);

  return {
    loadingAction,
    errorAction,
    getRoles,
    getRoleByIdSuccess,
    addRoleSuccess,
    editRoleSuccess,
    deleteRoleSuccess,
    deletesRoleSucces
  };
};
