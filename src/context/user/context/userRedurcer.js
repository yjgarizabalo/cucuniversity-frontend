export const Payload = {
  LOGIN_ACTION: "LOGIN_ACTION",
  ERROR_ACTION: "ERROR_ACTION",
  GET_USERS: "GET_USERS",
  GET_USER: "GET_USER",
  ADD_USER: "ADD_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
  DELETES_USER: "DELETES_USER",
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
    case Payload.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false,
      };
    case Payload.GET_USER:
      return {
        ...state,
        userSelected: action.payload,
        loading: false,
        error: false,
      };
    case Payload.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        error: false,
      };
    case Payload.EDIT_USER:
      return {
        ...state,
        users: action.payload && action.payload.id ? state.users.map((user) => (user.id === action.payload.id ? action.payload : user)) : state.users,
        loading: false,
        error: false,
      };
    case Payload.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
        error: false,
      };
    case Payload.DELETES_USER:
      return {
        ...state,
        users: state.users.filter((user) => !action.payload.includes(user.id)),
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
