import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useActiveLink } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';
import reducer from './jobReducer'
import { initialState } from '../initalState';
import { JobContext } from './jobContext';
import { useJobApi } from '../hooks/useJobApi';
import { useJobDispatch } from '../hooks/useJobDispatch';


// eslint-disable-next-line react/prop-types
export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isJobListViewActive = useActiveLink(paths.dashboard.user.jobs);
  // const isJobDetailsViewActive = useActiveLink(paths.dashboard.students_job.details(':id'));
  const { handleErrorMessageNotickBar } = useHandleResponseMessage();
  const { fetchJobs, fetchJobById, addJob, updateJob, deleteJob, multiDeleteJob } = useJobApi();
  const {
    loadingAction,
    errorAction,
    getJobs,
    getJobByIdSuccess,
    addJobSuccess,
    editJobSuccess,
    deleteJobSuccess,
  } = useJobDispatch();

  useEffect(() => {
    if (!isJobListViewActive) {
      loadingAction(dispatch);
    }
  }, [isJobListViewActive, loadingAction]);

  const getJobAction = useCallback(async () => {
    loadingAction(dispatch);
    try {
      const jobs = await fetchJobs();
      getJobs(dispatch, jobs);
    } catch (error) {
      console.error('se a presentado un error', error);
      errorAction(dispatch);
      handleErrorMessageNotickBar(error);
    }
  }, [loadingAction, errorAction, handleErrorMessageNotickBar, fetchJobs, getJobs]);

  const getJobByIdAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const job = await fetchJobById(id);
        getJobByIdSuccess(dispatch, job);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, getJobByIdSuccess, errorAction, handleErrorMessageNotickBar, fetchJobById]
  );

  const addJobAction = useCallback(
    async (job) => {
      loadingAction(dispatch);
      try {
        const newJob = await addJob(job);
        addJobSuccess(dispatch, newJob);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, addJobSuccess, errorAction, handleErrorMessageNotickBar, addJob]
  );

  const editJobAction = useCallback(
    async (job) => {
      loadingAction(dispatch);
      try {
        const jobEdited = await updateJob(job);
        editJobSuccess(dispatch, jobEdited);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, editJobSuccess, errorAction, handleErrorMessageNotickBar, updateJob]
  );

  const deleteJobAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        await deleteJob(id);
        deleteJobSuccess(dispatch, id);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, deleteJobSuccess, errorAction, handleErrorMessageNotickBar, deleteJob]
  );

  const memorizedState = useMemo(
    () =>
      ({
        jobs: state.jobs,
        jobSelected: state.jobSelected,
        loading: state.loading,
        loadingDetail: state.loadingDetail,
        error: state.error,
        getJobAction,
        getJobByIdAction,
        addJobAction,
        editJobAction,
        deleteJobAction,
        multiDeleteJob,
      }),
    [
      state.jobs,
      state.jobSelected,
      state.loading,
      state.loadingDetail,
      state.error,
      //
      getJobAction,
      getJobByIdAction,
      addJobAction,
      editJobAction,
      deleteJobAction,
      multiDeleteJob,
    ]
  );
  return <JobContext.Provider value={memorizedState}>{children}</JobContext.Provider>;
};
