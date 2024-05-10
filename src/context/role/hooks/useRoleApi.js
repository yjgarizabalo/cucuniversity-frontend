import { useCallback } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useHttpClient } from 'src/hooks/use-http-client';
import { useHandleResponseMessage } from 'src/hooks/use-handler-rosponse-msg';


export const useRoleApi = () => {
  const { getFetch, postFetch, updateFetch, deleteFetch } = useHttpClient(axiosInstance);
  const { handleResponseMessage } = useHandleResponseMessage();

  const fetchRoles = useCallback(async () => {
    const roles = await getFetch(endpoints.roles);
    return roles;
  }, [getFetch]);

  const fetchRoleById = useCallback(async id => {
    const role = await getFetch(`${endpoints.roles}/${id}`);
    handleResponseMessage(role)
    return role;
  }, [getFetch, handleResponseMessage]);

  const addRole = useCallback(async role => {
    const newRole = await postFetch(endpoints.roles, role);;
    handleResponseMessage(newRole);
    return newRole
  }, [postFetch, handleResponseMessage]);

  const updateRole = useCallback(async role => {
    const roleEdited = await updateFetch(`${endpoints.roles}/${role.id}`, role);
    handleResponseMessage(roleEdited);
    return roleEdited;
  }, [updateFetch, handleResponseMessage]);

  const deleteRole = useCallback(async id => {
    const roleDelete = await deleteFetch(`${endpoints.roles}/${id}`);
    handleResponseMessage(roleDelete);
  }, [deleteFetch, handleResponseMessage]);

  const multiDeleteRole = useCallback(async ids => {
    const rolesDelete = await Promise.all(
      ids.map(id => deleteFetch(`${endpoints.roles}/${id}`))
    );
    handleResponseMessage(rolesDelete[0], 'Delete roles success');
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
