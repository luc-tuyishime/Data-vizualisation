import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_RATE_START:
      return {
        ...state,
        fetchRate: {
          ...state.fetchRate,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_RATE_END:
      return {
        ...state,
        fetchRate: {
          ...state.fetchRate,
          loading: false
        }
      };
    case ussdActionsTypes.GET_RATE_SUCCESS:
      return {
        ...state,
        listOfRate: payload.data.result,
        fetchRate: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_RATE_FAILURE:
      return {
        ...state,
        fetchRate: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
