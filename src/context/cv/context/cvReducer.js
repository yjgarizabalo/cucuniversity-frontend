export const Payload = {
  'LOGIN_ACTION': 'LOGIN_ACTION',
  'ERROR_ACTION': 'ERROR_ACTION',
  GET_CVS: "GET_CVS",
  GET_CV: "GET_CV",
  ADD_CV: "ADD_CV",
  EDIT_CV: "EDIT_CV",
  DELETE_CV: "DELETE_CV",
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
    case Payload.GET_CVS:
      return {
        ...state,
        cvs: action.payload,
        loading: false,
        error: false,
      };
    case Payload.GET_CV:
      return {
        ...state,
        cvSelected: action.payload,
        loading: false,
        loadingDetail: false,
        error: false,
      };
    case Payload.ADD_CV:
      return {
        ...state,
        cvs: [action.payload, ...state.cvs],
        loading: false,
        error: false,
      };
    case Payload.EDIT_CV:
      return {
        ...state,
        cvs: action.payload && action.payload.id ? state.cvs.map((cv) => (cv.id === action.payload.id ? action.payload : cv)) : state.cvs,
        loading: false,
        error: false,
      };
    case Payload.DELETE_CV:
      return {
        ...state,
        cvs: state.cvs.filter((cv) => cv.id !== action.payload),
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
