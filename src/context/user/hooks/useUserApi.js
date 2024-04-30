import { useCallback } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useHttpClient } from 'src/hooks/use-http-client';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';

export const useUsersApi = () => {
  const { getFetch, postFetch, updateFetch, deleteFetch } = useHttpClient(axiosInstance);
  const { handleResponseMessage } = useHandleResponseMessage();

  const fetchUsers = useCallback(async () => {
    const users = await getFetch(endpoints.users);
    return users;
  }, [getFetch]);

  const fetchUserById = useCallback(async id => {
    const user = await getFetch(`${endpoints.users}/${id}`);
    return user;
  }, [getFetch]);

  const addUser = useCallback(async user => {
    const newUser = await postFetch(endpoints.users, user);
    handleResponseMessage(newUser);
    return newUser

  }, [postFetch, handleResponseMessage]);

  const updateUser = useCallback(async user => {
    const userEdited = await updateFetch(`${endpoints.userManager.users}/${user.id}`, user);
    handleResponseMessage(userEdited);
    return userEdited;
  }, [updateFetch, handleResponseMessage]);

  const deleteUser = useCallback(async id => {
    const userDelete = await deleteFetch(`${endpoints.userManager.users}/${id}`);
    handleResponseMessage(userDelete);
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
