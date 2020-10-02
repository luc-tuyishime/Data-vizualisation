import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_DURATION_AGENT_START:
      return {
        ...state,
        fetchDurationAgent: {
          ...state.fetchDurationAgent,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_DURATION_AGENT_END:
      return {
        ...state,
        fetchDurationAgent: {
          ...state.fetchDurationAgent,
          loading: false
        }
      };
    case ussdActionsTypes.GET_DURATION_AGENT_SUCCESS:
      return {
        ...state,
        listOfDurationAgent: payload.data.result,
        fetchDurationAgent: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_DURATION_AGENT_FAILURE:
      return {
        ...state,
        fetchDurationAgent: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
