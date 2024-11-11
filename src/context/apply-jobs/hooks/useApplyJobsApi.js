import { useCallback } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useHttpClient } from 'src/hooks/use-http-client';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';

export const useApplyJobsApi = () => {
  const { getFetch, postFetch, updateFetch } = useHttpClient(axiosInstance);
  const { handleResponseMessage } = useHandleResponseMessage();

  const fetchJobsByUserId = useCallback(async id => {
    const jobs = await getFetch(`${endpoints.applyJobs.jobsByUser}${id}`);
    return jobs;
  }, [getFetch]);

  const fetchUserByJobId = useCallback(async id => {
    const users = await getFetch(`${endpoints.applyJobs.usersByJob}${id}`);
    return users;
  }, [getFetch]);

  const applyToJob = useCallback(async data => {
    const response = await postFetch(endpoints.applyJobs.apply, data); 
    handleResponseMessage(response) 
  }, [postFetch, handleResponseMessage]);

  const disapplyToJob = useCallback(async data => {
    const response = await updateFetch(`${endpoints.applyJobs.apply}/${data.id}`, data);
    handleResponseMessage(response) 
  }, [updateFetch, handleResponseMessage ]);


  return {
    fetchJobsByUserId,
    fetchUserByJobId,
    applyToJob,
    disapplyToJob,
  };
};
