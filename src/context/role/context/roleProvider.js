import { useReducer, useMemo, useCallback } from 'react';
import { initialState } from '../initalState';
import { RoleContext } from './roleContext';
import reducer from './roleReducer'



// eslint-disable-next-line react/prop-types
export const RoleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const editRole = useCallback(
    async (role) => {
      // const response = await fetch(`http://localhost:3000/roles/${role.id}`)
      dispatch({ type: 'EDIT_ROLE', payload: role })
    },
    []
  )

  const memorizedState = useMemo(
    () => ({
      roles: state.roles,
      roleSelected: state.roleSelected,
      loading: state.loading,
      error: state.error,
      // getRole,
      // getRoleById,
      // addRole,
      editRole,
      // updateRole,
      // deleteRole,
      // multiDeleteRole,
    }),

    [
      state.roles,
      state.roleSelected,
      state.loading,
      state.error,
      //
      editRole,
    ]
  );
  return <RoleContext.Provider value={memorizedState}>{children}</RoleContext.Provider>;
};    