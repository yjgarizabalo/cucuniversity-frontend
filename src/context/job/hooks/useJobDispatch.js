import { useCallback } from "react";
import { Payload } from '../context/jobReducer';

export const useJobDispatch = () => {
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

  const getJobs = useCallback((dispatch, jobs) => {
    dispatch({
      type: Payload.GET_JOBS,
      payload: jobs
    });
  }, []);

  const getJobByIdSuccess = useCallback((dispatch, job) => {
    dispatch({
      type: Payload.GET_JOB,
      payload: job
    });
  }, []);

  const addJobSuccess = useCallback((dispatch, job) => {
    dispatch({
      type: Payload.ADD_JOB,
      payload:  job
    });
  }, []);

  const editJobSuccess = useCallback((dispatch, job) => {
    dispatch({
      type: Payload.EDIT_JOB,
      payload:  job
    });
  }, []);

  const deleteJobSuccess = useCallback((dispatch, id) => {
    dispatch({
      type: Payload.DELETE_JOB,
      payload: id
    });
  }, []);

  return {
    loadingAction,
    errorAction,
    getJobs,
    getJobByIdSuccess,
    addJobSuccess,
    editJobSuccess,
    deleteJobSuccess
  };
};
