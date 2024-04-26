import { useCallback } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useHttpClient } from 'src/hooks/use-http-client';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';

export const useUsersApi = () => {
  const { getFetch, postFetch, putFetch, deleteFetch } = useHttpClient(axiosInstance);
  const { handleResponseMessage } = useHandleResponseMessage();

  const fetchUsers = useCallback(async () => {
    const users = await getFetch(endpoints.users);
    console.log(users);
    return users;
  }, [getFetch]);

  const fetchUserById = useCallback(async id => {
    const response = await getFetch(`${endpoints.users}/${id}`);
    const user = response.data;
    return user;
  }, [getFetch]);

  const addUser = useCallback(async user => {
    const response = await postFetch(endpoints.users, user);
    const newUser = response.data;
    handleResponseMessage(response);
    return newUser

  }, [postFetch, handleResponseMessage]);

  const updateUser = useCallback(async user => {
    const response = await putFetch(`${endpoints.userManager.users}/${user.id}`, user);
    const userEdited = response.data;
    handleResponseMessage(response);
    return userEdited;
  }, [putFetch, handleResponseMessage]);

  const deleteUser = useCallback(async id => {
    const response = await deleteFetch(`${endpoints.userManager.users}/${id}`);
    handleResponseMessage(response);
  }, [deleteFetch, handleResponseMessage]);

  const multiDeleteUser = useCallback(async ids => {
    const response = await Promise.all(
      ids.map(id => deleteFetch(`${endpoints.userManager.users}/${id}`))
    );
    handleResponseMessage(response[0], 'Delete users success');
  }, [deleteFetch, handleResponseMessage]);

  return {
    fetchUsers,
    fetchUserById,
    addUser,
    updateUser,
    deleteUser,
    multiDeleteUser,
  };
};
