import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_RATE_AGENT_START:
      return {
        ...state,
        fetchRateAgent: {
          ...state.fetchRateAgent,
          message: '',
          loading: true,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_RATE_AGENT_END:
      return {
        ...state,
        fetchRateAgent: {
          ...state.fetchRateAgent,
          loading: false
        }
      };
    case ussdActionsTypes.GET_RATE_AGENT_SUCCESS:
      return {
        ...state,
        listOfRateAgent: payload.data.result,
        fetchRateAgent: {
          loading: false,
          message: payload.message,
          errors: {}
        }
      };
    case ussdActionsTypes.GET_RATE_AGENT_FAILURE:
      return {
        ...state,
        fetchRateAgent: {
          loading: false,
          message: '',
          errors: payload.errors
        }
      };
    default:
      return null;
  }
};
