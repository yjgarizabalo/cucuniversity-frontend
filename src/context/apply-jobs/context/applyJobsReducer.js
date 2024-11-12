export const Payload = {
    LOADING_ACTION: "LOADING_ACTION",
    ERROR_ACTION: "ERROR_ACTION",
    GET_JOBSBYUSER: "GET_JOBSBYUSER",
    GET_USERSBYJOB: "GET_USERSBYJOB",
    APPLY_JOB: "APPLY_JOB",
    DISAPPLY_JOB: "DISAPPLY_JOB",
  }
  
  
  const reducer = (state, action) => {
    switch (action.type) {
      case Payload.LOADING_ACTION:
        return {
          ...state,
          loading: action.payload.loading,
          error: false,
        };
      case Payload.ERROR_ACTION:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case Payload.GET_JOBSBYUSER:
        return {
          ...state,
          jobsByUser: action.payload,
          loading: false,
          error: false,
        };
      case Payload.GET_USERSBYJOB:
        return {
          ...state,
          loading: false,
          usersByJob: action.payload,
          error: false,
        };
      case Payload.APPLY_JOB:
        return {
          ...state,
          loading: false,
          error: false,
        };
      case Payload.DISAPPLY_JOB:
        return {
          ...state,
          loading: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  