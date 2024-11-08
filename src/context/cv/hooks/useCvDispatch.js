import { useCallback } from "react";
import { Payload } from '../context/cvReducer';

export const useCvDispatch = () => {
  const loadingAction = useCallback((dispatch) => {
    dispatch({
      type: Payload.LOGIN_ACTION,
      payload: true
    });
  }, []);

  const errorAction = useCallback((dispatch, error) => {
    dispatch({
      type: Payload.ERROR_ACTION,
      payload: error
    });

    setTimeout(() => {
      dispatch({
        type: Payload.ERROR_ACTION,
        payload: false
      });
    }, 4000);
  }, []);

  const getCvs = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.GET_CVS,
      payload: cv
    });
  }, []);

  const getCvByIdSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.GET_CV,
      payload: cv
    });
  }, []);

  const getCvByUserIdSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.GET_CV_BY_USER_ID,
      payload: cv
    });
  }, []);

  const addCvSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.ADD_CV,
      payload:  cv
    });
  }, []);

  const addUserCvSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.ADD_USERCV,
      payload:  cv
    });
  }, []);

  const editCvSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.EDIT_USERCV,
      payload:  cv
    });
  }, []);

  const deleteCvSuccess = useCallback((dispatch, id) => {
    dispatch({
      type: Payload.DELETE_CV,
      payload: id
    });
  }, []);

  return {
    loadingAction,
    errorAction,
    getCvs,
    getCvByIdSuccess,
    getCvByUserIdSuccess,
    addCvSuccess,
    addUserCvSuccess,
    editCvSuccess,
    deleteCvSuccess
  };
};

