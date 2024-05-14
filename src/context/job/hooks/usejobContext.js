import { useContext } from 'react';
import { JobContext } from '../context/jobContext';

export const useJobContext = () => {
  const context = useContext(JobContext);

  if (!context) throw new Error('useJobContext must be used within an JobProvider');

  return context;
};
