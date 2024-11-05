import { useCallback } from "react";
import axiosInstance, {endpoints} from "src/utils/axios";
import { useHttpClient } from "src/hooks/use-http-client";
import { useHandleResponseMessage } from "src/hooks/use-handler-rosponse-msg";

export const useCvApi = () => {
  const { getFetch, postFetch, updateFetch, deleteFetch } = useHttpClient(axiosInstance);
  const { handleResponseMessage } = useHandleResponseMessage();

  const fetchCvs = useCallback(async () => {
    const cvs = await getFetch(endpoints.cv);
    return cvs;
  }, [getFetch]);

  const fetchCvById = useCallback(async (id) => {
    const cv = await getFetch(`${endpoints.cv}/${id}`);
    handleResponseMessage(cv);
    return cv;
  }, [getFetch, handleResponseMessage]);

  const fetchCvByUserId = useCallback(async (id) => {
    const cv = await getFetch(`${endpoints.cv}/user/${id}`);
    handleResponseMessage(cv);
    return cv
  }, [ getFetch, handleResponseMessage]);

  const addCv = useCallback(async (cv) => {
    const newCv = await postFetch(endpoints.cv, cv);
    handleResponseMessage(newCv);
    return newCv;
  }, [postFetch, handleResponseMessage]);

  const updateCv = useCallback(async (id, cv) => {
    const cvEdited = await updateFetch(`${endpoints.cv}/${id}`, cv);
    handleResponseMessage(cvEdited);
    return cvEdited;
  }, [updateFetch, handleResponseMessage]);

  const deleteCv = useCallback(async (id) => {
    const cvDelete = await deleteFetch(`${endpoints.cv}/${id}`);
    handleResponseMessage(cvDelete);
  }, [deleteFetch, handleResponseMessage]);

  const multiDeleteCv = useCallback(async (ids) => {
    const cvsDelete = await Promise.all(
      ids.map((id) => deleteFetch(`${endpoints.cvs}/${id}`))
    );
    handleResponseMessage(cvsDelete[0], "Delete cvs success");
  }, [deleteFetch, handleResponseMessage]);

  return {
    fetchCvs,
    fetchCvById,
    fetchCvByUserId,
    addCv,
    updateCv,
    deleteCv,
    multiDeleteCv,
  };
};

