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

  const getCvs = useCallback((dispatch, cvs) => {
    dispatch({
      type: Payload.GET_CVS,
      payload: cvs
    });
  }, []);

  const getCvByIdSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.GET_CV,
      payload: cv
    });
  }, []);

  const addCvSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.ADD_CV,
      payload:  cv
    });
  }, []);

  const editCvSuccess = useCallback((dispatch, cv) => {
    dispatch({
      type: Payload.EDIT_CV,
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
    addCvSuccess,
    editCvSuccess,
    deleteCvSuccess
  };
};

