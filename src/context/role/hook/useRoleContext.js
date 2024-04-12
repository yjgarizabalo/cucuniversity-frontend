import { useContext } from "react";
import { RoleContext } from '../context/roleContext';

export const useRoleContext = () => {
  const context = useContext(RoleContext);

  if (!context) throw new Error('useRoleContext must be used within an RoleProvider');

  return context;
};