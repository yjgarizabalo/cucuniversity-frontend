import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useActiveLink } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';
import reducer from './cvReducer'
import { initialState } from '../initialState'
import { CvContext } from './cvContext';
import { useCvApi } from '../hooks/useCvApi';
import { useCvDispatch } from '../hooks/useCvDispatch';

// eslint-disable-next-line react/prop-types
export const CvProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isCvListViewActive = useActiveLink(paths.dashboard.user.cv);
  const { handleErrorMessageNotickBar } = useHandleResponseMessage();
  const { fetchCvs, fetchCvById, fetchCvByUserId, addCv, updateCv, deleteCv, multiDeleteCv } = useCvApi();

  const {
    loadingAction,
    errorAction,
    getCvs,
    getCvByIdSuccess,
    getCvByUserIdSuccess,
    addCvSuccess,
    addUserCvSuccess,
    editCvSuccess,
    deleteCvSuccess,
  } = useCvDispatch();

  useEffect(() => {
    if (!isCvListViewActive) {
      loadingAction(dispatch);
    }
  }, [isCvListViewActive, loadingAction]);

  const getCvAction = useCallback(async () => {
    loadingAction(dispatch);
    try {
      const cvs = await fetchCvs();
      getCvs(dispatch, cvs);
    } catch (error) {
      console.error('se a presentado un error', error);
      errorAction(dispatch);
      handleErrorMessageNotickBar(error);
    }
  }, [loadingAction, errorAction, handleErrorMessageNotickBar, fetchCvs, getCvs]);

  const getCvByIdAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const cv = await fetchCvById(id);
        getCvByIdSuccess(dispatch, cv);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, getCvByIdSuccess, errorAction, handleErrorMessageNotickBar, fetchCvById]
  );

  const getCvByUserIdAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        const cv = await fetchCvByUserId(id);
        getCvByUserIdSuccess(dispatch, cv);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, getCvByUserIdSuccess, errorAction, handleErrorMessageNotickBar, fetchCvByUserId]
  )

  const addCvAction = useCallback(
    async (data) => {
      loadingAction(dispatch);
      try {
        const cv = await addCv(data);
        addCvSuccess(dispatch, cv);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, addCvSuccess, errorAction, handleErrorMessageNotickBar, addCv]
  );

  const addUserCvAction = useCallback(
    async (data) => {
      loadingAction(dispatch);
      try {
        const cv = await addCv(data);
        addUserCvSuccess(dispatch, cv);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, addUserCvSuccess, errorAction, handleErrorMessageNotickBar, addCv]
  );

  const editCvAction = useCallback(
    async (id, data) => {
      loadingAction(dispatch);
      try {
        const cv = await updateCv(id, data);
        editCvSuccess(dispatch, cv);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, editCvSuccess, errorAction, handleErrorMessageNotickBar, updateCv]
  );

  const deleteCvAction = useCallback(
    async (id) => {
      loadingAction(dispatch);
      try {
        await deleteCv(id);
        deleteCvSuccess(dispatch, id);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, deleteCvSuccess, errorAction, handleErrorMessageNotickBar, deleteCv]
  );

  const multiDeleteCvAction = useCallback(
    async (ids) => {
      loadingAction(dispatch);
      try {
        await multiDeleteCv(ids);
        deleteCvSuccess(dispatch, ids);
      } catch (error) {
        console.error('se a presentado un error', error);
        errorAction(dispatch);
        handleErrorMessageNotickBar(error);
      }
    },
    [loadingAction, deleteCvSuccess, errorAction, handleErrorMessageNotickBar, multiDeleteCv]
  );

  const memorizedState = useMemo(
    () =>
    ({
      cv: state.cv,
      cvSelected: state.cvSelected,
      userCV: state.userCV,
      loading: state.loading,
      loadingDetail: state.loadingDetail,
      error: state.error,
      getCvAction,
      getCvByIdAction,
      getCvByUserIdAction,
      addCvAction,
      addUserCvAction,
      editCvAction,
      deleteCvAction,
      multiDeleteCvAction,
    }),
    [
      state.cv,
      state.cvSelected,
      state.loading,
      state.loadingDetail,
      state.error,
      state.userCV,
      //
      getCvAction,
      getCvByIdAction,
      getCvByUserIdAction,
      addCvAction,
      addUserCvAction,
      editCvAction,
      deleteCvAction,
      multiDeleteCvAction
    ]
  );
  return <CvContext.Provider value={memorizedState}>{children}</CvContext.Provider>;
};
