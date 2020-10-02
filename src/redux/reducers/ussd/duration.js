import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_DURATION_START:
      return {
        ...state,
        fetchDuration: {
          ...state.fetchDuration,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_DURATION_END:
      return {
        ...state,
        fetchDuration: {
          ...state.fetchDuration,
          loading: false
        }
      };
    case ussdActionsTypes.GET_DURATION_SUCCESS:
      return {
        ...state,
        listOfDuration: payload.data.result,
        fetchDuration: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_DURATION_FAILURE:
      return {
        ...state,
        fetchDuration: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
