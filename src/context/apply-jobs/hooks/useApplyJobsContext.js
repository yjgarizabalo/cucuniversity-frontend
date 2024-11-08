import { useContext } from 'react';
import { ApplyJobsContext } from '../context/applyJobsContext';

export const useApplyJobsContext = () => {
  const context = useContext(ApplyJobsContext);

  if (!context) throw new Error('useApplyJobsContext must be used within an ApplyJobsProvider');

  return context;
};
