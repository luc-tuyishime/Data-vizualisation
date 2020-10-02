import { ussdActionsTypes } from '../../actions-types';

export default (state, { type, payload }) => {
  switch (type) {
    case ussdActionsTypes.GET_PERFORMANCE:
      return {
        ...state,
        listOfPerformance: payload
      };

    default:
      return null;
  }
};
