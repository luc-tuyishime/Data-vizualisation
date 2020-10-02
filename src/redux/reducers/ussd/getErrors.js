import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_ERROR_START:
      return {
        ...state,
        fetchError: {
          ...state.fetchError,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_ERROR_END:
      return {
        ...state,
        fetchError: {
          ...state.fetchError,
          loading: false
        }
      };
    case ussdActionsTypes.GET_ERROR_SUCCESS:
      return {
        ...state,
        listOfError: payload.data.result,
        fetchError: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_ERROR_FAILURE:
      return {
        ...state,
        fetchError: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
