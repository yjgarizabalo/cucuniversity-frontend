export const Payload = {
  'LOGIN_ACTION': 'LOGIN_ACTION',
  'ERROR_ACTION': 'ERROR_ACTION',
  GET_ROLES: "GET_ROLES",
  GET_ROLE: "GET_ROLE",
  ADD_ROLE: "ADD_ROLE",
  EDIT_ROLE: "EDIT_ROLE",
  DELETE_ROLE: "DELETE_ROLE",
  DELETES_ROLE: "DELETES_ROLE",
}

const reducer = (state, action) => {
  switch (action.type) {
    case Payload.LOGIN_ACTION:
      return {
        ...state,
        loading: action.payload,
        error: false,
      };
    case Payload.ERROR_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Payload.GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        loading: false,
        error: false,
      };
    case Payload.GET_ROLE:
      return {
        ...state,
        roleSelected: action.payload,
        loading: false,
        error: false,
      };
    case Payload.ADD_ROLE:
      return {
        ...state,
        roles: [action.payload, ...state.roles],
        loading: false,
        error: false,
      };
    case Payload.EDIT_ROLE:
      return {
        ...state,
        roles: state.roles.map((role) => (role.id === action.payload.id ? action.payload : role)),
        loading: false,
        error: false,
      };
    case Payload.DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload),
        loading: false,
        error: false,
      };
    case Payload.DELETES_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => !action.payload.includes(role.id)),
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
