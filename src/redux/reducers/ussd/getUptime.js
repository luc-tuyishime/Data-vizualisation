import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_UPTIME_START:
      return {
        ...state,
        fetchUptime: {
          ...state.feUptime,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_UPTIME_END:
      return {
        ...state,
        fetchUptime: {
          ...state.fetchUptime,
          loading: false
        }
      };
    case ussdActionsTypes.GET_UPTIME_SUCCESS:
      return {
        ...state,
        listOfUptime: payload.data.result,
        fetchUptime: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_UPTIME_FAILURE:
      return {
        ...state,
        fetchUptime: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
