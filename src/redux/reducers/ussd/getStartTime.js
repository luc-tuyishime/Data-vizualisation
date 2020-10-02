import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_START_TIME_START:
      return {
        ...state,
        fetchStartTime: {
          ...state.feUptime,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_START_TIME_END:
      return {
        ...state,
        fetchStartTime: {
          ...state.fetchUptime,
          loading: false
        }
      };
    case ussdActionsTypes.GET_START_TIME_SUCCESS:
      return {
        ...state,
        listOfStartTime: payload.data.result,
        fetchStartTime: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_START_TIME_FAILURE:
      return {
        ...state,
        fetchStartTime: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
