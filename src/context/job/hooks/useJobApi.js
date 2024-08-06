import { useCallback } from 'react';
import axiosInstance, {endpoints} from 'src/utils/axios';
import {useHttpClient} from 'src/hooks/use-http-client';
import {useHandleResponseMessage} from 'src/hooks/use-handler-rosponse-msg';


export const useJobApi = () => {
  const {getFetch, postFetch, updateFetch, deleteFetch} = useHttpClient(axiosInstance);
  const {handleResponseMessage} = useHandleResponseMessage();

  const fetchJobs = useCallback(async () => {
    const jobs = await getFetch(endpoints.jobs);
    return jobs;
  }, [getFetch]);

  const fetchJobById = useCallback(async id => {
    const job = await getFetch(`${endpoints.jobs}/${id}`);
    handleResponseMessage(job)
    return job;
  }, [getFetch, handleResponseMessage]);

  const addJob = useCallback(async job => {
    const newJob = await postFetch(endpoints.jobs, job);
    handleResponseMessage(newJob);
    return newJob
  }, [postFetch, handleResponseMessage]);

  const updateJob = useCallback(async job => {
    const jobEdited = await updateFetch(`${endpoints.jobs}/${job.id}`, job);
    handleResponseMessage(jobEdited);
    return jobEdited;
  }, [updateFetch, handleResponseMessage]);

  const deleteJob = useCallback(async id => {
    const jobDelete = await deleteFetch(`${endpoints.jobs}/${id}`);
    handleResponseMessage(jobDelete);
  }, [deleteFetch, handleResponseMessage]);

  const multiDeleteJob = useCallback(async ids => {
    const jobsDelete = await Promise.all(
      ids.map(id => deleteFetch(`${endpoints.jobs}/${id}`))
    );
    handleResponseMessage(jobsDelete[0], 'Delete jobs success');
  }, [deleteFetch, handleResponseMessage]);

  return {
    fetchJobs,
    fetchJobById,
    addJob,
    updateJob,
    deleteJob,
    multiDeleteJob,
  };
};
