import { useCallback } from 'react';

export const useHttpClient = (axiosInstance) => {
  const getFetch = useCallback(
    async (url, config) => {
      const response = await axiosInstance.get(url, config);
      return response.data;
    },
    [axiosInstance]
  );

  const postFetch = useCallback(
    async (url, data, config) => {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    },
    [axiosInstance]
  );

  const updateFetch = useCallback(
    async (url, data, config) => {
      const response = await axiosInstance.patch(url, data, config);
      return response.data;
    },
    [axiosInstance]
  );

  const deleteFetch = useCallback(
    async (url, config) => {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    },
    [axiosInstance]
  );

  return {
    getFetch,
    postFetch,
    updateFetch,
    deleteFetch,
  };
};
