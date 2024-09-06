import { useContext } from "react";
import { CvContext } from '../context/cvContext';

export const useCvContext = () => {
  const context = useContext(CvContext);

  if (!context) throw new Error('useCvContext must be used within an CvProvider');

  return context;
};
