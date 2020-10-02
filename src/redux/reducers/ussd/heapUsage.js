import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_HEAP_USAGE_START:
      return {
        ...state,
        fetchHeapRate: {
          ...state.fetchHeapRate,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_HEAP_USAGE_END:
      return {
        ...state,
        fetchHeapRate: {
          ...state.fetchHeapRate,
          loading: false
        }
      };
    case ussdActionsTypes.GET_HEAP_USAGE_SUCCESS:
      return {
        ...state,
        listOfHeapRate: payload.data.result,
        fetchHeapRate: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_HEAP_USAGE_FAILURE:
      return {
        ...state,
        fetchHeapRate: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
