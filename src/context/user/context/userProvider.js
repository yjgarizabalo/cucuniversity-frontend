import { useReducer, useMemo } from 'react';
import { initialState } from '../initalState';
import { UserContext } from './userContetxt';
import reducer  from './userRedurcer'


// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);



  const memorizedState = useMemo(
    () => ({
      users: state.users,
      userSelected: state.userSelected,
      loading: state.loading,
      error: state.error,
      // getUser,
      // getUserById,
      // addUser,
      // editUser,
      // updateUser,
      // deleteUser,
      // multiDeleteUser,
    }),
    [
      // getUser,
      state.users,
      state.userSelected,
      state.loading,
      state.error,
    ]
  );

  return <UserContext.Provider value={memorizedState}>{children}</UserContext.Provider>;
};
