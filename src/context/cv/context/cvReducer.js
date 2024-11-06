export const Payload = {
  'LOGIN_ACTION': 'LOGIN_ACTION',
  'ERROR_ACTION': 'ERROR_ACTION',
  GET_CVS: "GET_CVS",
  GET_CV: "GET_CV",
  GET_CV_BY_USER_ID: "GET_CV_BY_USER_ID",
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
    case Payload.GET_CV_BY_USER_ID:
      return {
        ...state,
        cv: action.payload,
        loading: false,
        loadingDetail: false,
        error: false,
      };
    case Payload.ADD_CV:
      return {
        ...state,
        cv: [action.payload, ...state.cv],
        loading: false,
        error: false,
      };
    case Payload.EDIT_CV:
      return {
        ...state,
        cv: action.payload && action.payload.id
          ? state.cv.map((cv) => (cv.id === action.payload.id ? action.payload : cv))
          : state.cv,
        cvSelected: action.payload && action.payload.id === state.cvSelected?.id
          ? action.payload
          : state.cvSelected,
        loading: false,
        error: false,
      };
    case Payload.DELETE_CV:
      return {
        ...state,
        cv: state.cv.filter((cv) => cv.id !== action.payload),
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
