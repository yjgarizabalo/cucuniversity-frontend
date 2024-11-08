import { useCallback } from "react";
import { Payload } from '../context/applyJobsReducer';

export const useApplyJobsDispatch = () => {
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

  const getJobsByUserSuccess = useCallback((dispatch, jobs) => {
    dispatch({
      type: Payload.GET_JOBSBYUSER,
      payload: jobs,
    });
  }, []);

  const getUserByJobIdSuccess = useCallback((dispatch, users) => {
    dispatch({
      type: Payload.GET_USERSBYJOB,
      payload: users
    });
  }, []);

  const applyToJobSuccess = useCallback((dispatch) => {
    dispatch({
      type: Payload.APPLY_JOB,
    });
  }, []);

  const disapplyToJobSuccess = useCallback((dispatch) => {
    dispatch({
      type: Payload.DISAPPLY_JOB,
    });
  }, []);

  return {
    loadingAction,
    errorAction,
    getJobsByUserSuccess,
    getUserByJobIdSuccess,
    applyToJobSuccess,
    disapplyToJobSuccess,
  };

};
