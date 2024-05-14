export const Payload = {
  'LOGIN_ACTION': 'LOGIN_ACTION',
  'ERROR_ACTION': 'ERROR_ACTION',
  GET_JOBS: "GET_JOBS",
  GET_JOB: "GET_JOB",
  ADD_JOB: "ADD_JOB",
  EDIT_JOB: "EDIT_JOB",
  DELETE_JOB: "DELETE_JOB",
  DELETES_JOB: "DELETES_JOB",
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
    case Payload.GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: false,
      };
    case Payload.GET_JOB:
      return {
        ...state,
        jobSelected: action.payload,
        loading: false,
        error: false,
      };
    case Payload.ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
        loading: false,
        error: false,
      };
    case Payload.EDIT_JOB:
      return {
        ...state,
        jobs: action.payload && action.payload.id ? state.jobs.map((job) => (job.id === action.payload.id ? action.payload : job)) : state.jobs,
        loading: false,
        error: false,
      };
    case Payload.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
