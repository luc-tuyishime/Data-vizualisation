import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_NON_HEAP_USAGE_START:
      return {
        ...state,
        fetchNonHeapRate: {
          ...state.fetchNonHeapRate,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_NON_HEAP_USAGE_END:
      return {
        ...state,
        fetchNonHeapRate: {
          ...state.fetchNonHeapRate,
          loading: false
        }
      };
    case ussdActionsTypes.GET_NON_HEAP_USAGE_SUCCESS:
      return {
        ...state,
        listOfNonHeapRate: payload.data.result,
        fetchNonHeapRate: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_NON_HEAP_USAGE_FAILURE:
      return {
        ...state,
        fetchNonHeapRate: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
