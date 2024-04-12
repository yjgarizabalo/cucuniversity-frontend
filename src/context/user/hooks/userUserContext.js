import { useContext } from 'react';
import { UserContext } from '../context/userContetxt';

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUserContext must be used within an UserProvider');

  return context;
};