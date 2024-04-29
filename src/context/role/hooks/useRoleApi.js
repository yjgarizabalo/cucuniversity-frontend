import { useCallback } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useHttpClient } from 'src/hooks/use-http-client';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';


export const useRoleApi = () => {
  const { getFetch, postFetch, putFetch, deleteFetch } = useHttpClient(axiosInstance);
  const { handleResponseMessage } = useHandleResponseMessage();

  const fetchRoles = useCallback(async () => {
    const roles = await getFetch(endpoints.roles);
    console.log(roles);
    return roles;
  }, [getFetch]);

  const fetchRoleById = useCallback(async id => {
    const response = await getFetch(`${endpoints.roles}/${id}`);
    const role = response.data;
    return role;
  }, [getFetch]);

  const addRole = useCallback(async role => {
    const response = await postFetch(endpoints.roles, role);
    const newRole = response.data;
    handleResponseMessage(response);
    return newRole

  }, [postFetch, handleResponseMessage]);

  const updateRole = useCallback(async role => {
    const response = await putFetch(`${endpoints.roles}/${role.id}`, role);
    const roleEdited = response.data;
    handleResponseMessage(response);
    return roleEdited;
  }, [putFetch, handleResponseMessage]);

  const deleteRole = useCallback(async id => {
    const response = await deleteFetch(`${endpoints.roles}/${id}`);
    handleResponseMessage(response);
  }, [deleteFetch, handleResponseMessage]);

  const multiDeleteRole = useCallback(async ids => {
    const response = await Promise.all(
      ids.map(id => deleteFetch(`${endpoints.roles}/${id}`))
    );
    handleResponseMessage(response[0], 'Delete roles success');
  }, [deleteFetch, handleResponseMessage]);

  return {
    fetchRoles,
    fetchRoleById,
    addRole,
    updateRole,
    deleteRole,
    multiDeleteRole,
  };
};
