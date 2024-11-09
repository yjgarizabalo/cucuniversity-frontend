import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useActiveLink } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';
import reducer from './applyJobsReducer';
import { initialState } from '../initialState';
import { ApplyJobsContext } from './applyJobsContext';
import { useApplyJobsApi } from '../hooks/useApplyJobsApi';
import { useApplyJobsDispatch } from '../hooks/useApplyJobsDispatch';

// eslint-disable-next-line react/prop-types
export const ApplyJobsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isUserListViewActive = useActiveLink(paths.dashboard.user.list);
  const { handleErrorMessageNotickBar } = useHandleResponseMessage();
  const { fetchJobsByUserId, fetchUserByJobId, applyToJob, disapplyToJob } = useApplyJobsApi();
  const {
    loadingAction,
    errorAction,
    getJobsByUserSuccess,
    getUserByJobIdSuccess,
    applyToJobSuccess,
    disapplyToJobSucces,
  } = useApplyJobsDispatch();

  //   useEffect(() => {
  //     if (!isUserListViewActive) {
  //       loadingAction(dispatch);
  //     }
  //   }, [isUserListViewActive, loadingAction]);

  const getJobsByUserIdAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const jobs = await fetchJobsByUserId(id);
        getJobsByUserSuccess(dispatch, jobs);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [
      loadingAction,
      errorAction,
      handleErrorMessageNotickBar,
      fetchJobsByUserId,
      getJobsByUserSuccess,
    ]
  );

  const getUsersByJobIdAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const users = await fetchUserByJobId(id);
        getUserByJobIdSuccess(dispatch, users);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [
      loadingAction,
      getUserByJobIdSuccess,
      errorAction,
      handleErrorMessageNotickBar,
      fetchUserByJobId,
    ]
  );

  const applyJobAction = useCallback(
    async (data) => {
      try {
        await applyToJob(data);
        applyToJobSuccess(dispatch);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error);
        throw error;
      }
    },
    [applyToJobSuccess, handleErrorMessageNotickBar, applyToJob]
  );

  const disapplyJobAction = useCallback(
    async (user) => {
      try {
        await disapplyToJob(user);
        disapplyToJobSucces(dispatch);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessageNotickBar(error, 'fall al desaplicar');
        throw error;
      }
    },
    [disapplyToJobSucces, handleErrorMessageNotickBar, disapplyToJob]
  );

  const memorizedState = useMemo(
    () => ({
      jobsByUser: state.jobsByUser,
      usersByJob: state.usersByJob,
      loading: state.loading,
      error: state.error,
      getJobsByUserIdAction,
      getUsersByJobIdAction,
      applyJobAction,
      disapplyJobAction,
    }),
    [
      getJobsByUserIdAction,
      getUsersByJobIdAction,
      applyJobAction,
      disapplyJobAction,
      state.jobsByUser,
      state.usersByJob,
      state.loading,
      state.error,
    ]
  );

  return <ApplyJobsContext.Provider value={memorizedState}>{children}</ApplyJobsContext.Provider>;
};
